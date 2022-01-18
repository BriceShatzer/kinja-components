// @flow

import * as React from 'react';
import FormattedTime from 'kinja-components/utils/DateTime';
const { getTimestampFromBackendDate } = FormattedTime;

import Analytics from '../hoc/analytics';
import HomepageEditToolbar from '../homepage-edit-toolbar/homepage-edit-toolbar';
import ConfirmationModal from './confirmation-modal';
import CurationBlockList from './curation-block-list';
import { Provider } from './editor-context';
import reducer from './reducer';
import getInvalidCards from './utils/getInvalidCards';
import addPost from './utils/addPost';
import updateBlock from './utils/updateBlock';
import shouldShowWarning, {
	isNewWarningGreater,
	type EditorWarning,
	type ConcurrentEditWarningType,
	type UserWithTimestamp
} from 'kinja-components/components/curation-block/utils/shouldShowWarning';
import FixedWarningBar from 'kinja-components/components/curation-block/warnings/fixed-warning-bar';
import ConcurrentEditingWarning from 'kinja-components/components/curation-block/warnings/ConcurrentEditingWarning';

// API
import { getUsers } from 'kinja-magma/api/profile';
import User from 'kinja-magma/models/User';

import type { CardIndex } from './undo-stack';
import type { ResolvedCurationBlockList } from 'kinja-magma/controllers/front-page/getCurationBlockData';
import type { CurationBlock, Autofill, CurationBlockLayout, CurationBlockTypeString } from 'kinja-magma/models/CurationBlock';
import type { BlogId } from 'kinja-magma/models/Id';
import type { AnalyticsInjectedProps } from '../hoc/analytics';
import type { Action, State } from './reducer';
import type CurationHeartbeat from 'kinja-magma/models/CurationHeartbeat';

type Props = {|
	currentUser: ?User,
	startingData: ResolvedCurationBlockList,
	toolbarContainer: HTMLDivElement,
	blogName: string,
	blogId: BlogId,
	onCancel: () => void,
	onSave: (blocks: Array<CurationBlock>) => void,
	onError: string => void,
	getHeartbeat: (lastEditAction: number) => Promise<CurationHeartbeat>,
	enableConcurrentEditing ?: boolean,
	isSatire ?: boolean,
	useVideoPlaylist: boolean,
	pollingDelay?: number
|} & AnalyticsInjectedProps;

type WarningData = {
	type: ConcurrentEditWarningType,
	editors: Array<UserWithTimestamp>
}

type ModalWarningData = {
	preloaded?: boolean
} & WarningData

function CuratedHomepageEditor(props: Props) {
	const [state, dispatch] = React.useReducer<State, Action>(reducer, {
		editStack: [props.startingData.curationBlocks],
		selectedCardIndex: null,
		selectedBlockIndex: null,
		undoPointer: null,
		cache: props.startingData,
		cardErrors: {},
		loadingCards: [],
		loadingBlocks: [],
		editMode: 'CardEditing',
		cardIsDragging: false,
		lastEditActionTimestamp: Date.now(),
		heartbeatData: null,
		closedConcurrentEditingWarningLevel: null
	});

	const {
		enableConcurrentEditing,
		currentUser,
		blogName,
		toolbarContainer,
		onCancel,
		onSave,
		onError,
		getHeartbeat,
		isSatire,
		blogId,
		useVideoPlaylist,
		ga,
		pollingDelay = 5000
	} = props;

	const dispatchWithTimestamp = React.useCallback((action: Action) => {
		dispatch({ type: 'UpdateLastEditTimestamp' });
		dispatch(action);
	}, [dispatch]);

	const [showConfirmationModal, setShowConfirmationModal] = React.useState<boolean>(false);
	const [polling, startPolling] = React.useState<boolean>(false);
	const [pollingWarning, setPollingWarning] = React.useState<WarningData | null>(null);
	const [modalWarning, setModalWarning] = React.useState<ModalWarningData | null>(null);
	const [showEditor, setShowEditor] = React.useState<boolean>(!enableConcurrentEditing);

	// REFS
	const warningDataRef = React.useRef<EditorWarning | null>(null);
	const currentUserRef = React.useRef<User | null>(currentUser || null);
	const prevUpdatedAtTimestampRef = React.useRef<number | null>(null);
	const timerRef = React.useRef<TimeoutID | null>(null);
	const prevHeartbeatRef = React.useRef<CurationHeartbeat | null>(null);

	const showWarning = React.useCallback((type: 'polling' | 'modal', preloaded?: boolean) => {
		if (prevUpdatedAtTimestampRef.current) {
			if (warningDataRef.current) {
				const { activePeers, warningType, updatedBy } = warningDataRef.current;
				const activeIds = activePeers.map(p => p.userId);

				getUsers(activeIds).then(r => {
					const warningData = {
						type: warningType,
						editors: r.map(e => {
							const activePeer = activePeers.find(p => p.userId === e.id);
							return {
								editor: e,
								lastEditAction: activePeer && getTimestampFromBackendDate(activePeer.lastEditAction),
								updatedBy: warningType === 'OverwriteWarning' && e.id === updatedBy
							};
						})
					};
					switch (type) {
						case 'polling':
							setPollingWarning(warningData);
							return;
						case 'modal':
							setPollingWarning(null);
							setModalWarning({
								...warningData,
								preloaded
							});
					}
				});
			} else {
				setShowEditor(true);
				setModalWarning(null);
				setPollingWarning(null);
			}
		}
	}, []);

	// set last edit timestamp upon opening the editor
	// fetch initial heartbeat data once current user is available and start polling
	React.useEffect(() => {
		if (enableConcurrentEditing && currentUser && !currentUserRef.current) {
			currentUserRef.current = currentUser;
		}

		if (enableConcurrentEditing && currentUserRef.current && state.lastEditActionTimestamp && !polling) {
			getHeartbeat(state.lastEditActionTimestamp).then(r => {
				// set previous updated date on editor init
				if (!prevUpdatedAtTimestampRef.current) {
					prevUpdatedAtTimestampRef.current = getTimestampFromBackendDate(r.updatedAt);
				}
				if (currentUserRef.current) {
					warningDataRef.current = shouldShowWarning(r, currentUserRef.current.id, prevUpdatedAtTimestampRef.current);
					showWarning('modal', true);
				}
				dispatch({
					type: 'UpdateHeartbeatDataAction',
					data: r
				});
				startPolling(true);
			});
		}
	}, [state.lastEditActionTimestamp, blogId, currentUser, showWarning, polling, enableConcurrentEditing, getHeartbeat]);

	React.useEffect(() => {
		if (polling) {
			const heartbeatPolling = () => {
				if (state.lastEditActionTimestamp) {
					getHeartbeat(state.lastEditActionTimestamp)
						.then(r => {
							dispatch({
								type: 'UpdateHeartbeatDataAction',
								data: r
							});

							timerRef.current = setTimeout(heartbeatPolling, pollingDelay);
						});
				}
			};

			if (enableConcurrentEditing) {
				if (timerRef.current) {
					clearTimeout(timerRef.current);
				}

				timerRef.current = setTimeout(heartbeatPolling, pollingDelay);
			}
		}
	}, [state.lastEditActionTimestamp, polling, enableConcurrentEditing, pollingDelay, getHeartbeat]);

	// If the user list changed (users left, users joined, logged out then logged in again, etc.)
	// or if someone new updated the homepage, reset the dismissed warning level.
	React.useEffect(() => {
		// Assume the worse by default.
		let usersChanged = true;
		let updatedByChanged = true;

		if (prevHeartbeatRef.current && state.heartbeatData) {
			updatedByChanged = prevHeartbeatRef.current.updatedBy !== state.heartbeatData.updatedBy;
			usersChanged = prevHeartbeatRef.current.currentEditors.length < state.heartbeatData.currentEditors.length;
		}

		if (usersChanged || updatedByChanged) {
			dispatch({
				type: 'UpdateClosedConcurrentEditingWarningLevel',
				data: null
			});
		}

		prevHeartbeatRef.current = state.heartbeatData || null;
	}, [prevHeartbeatRef, state.heartbeatData]);

	// Show/hide warning bar
	React.useEffect(() => {
		if (enableConcurrentEditing && state.heartbeatData && currentUserRef.current) {
			warningDataRef.current = shouldShowWarning(
				state.heartbeatData,
				currentUserRef.current.id,
				prevUpdatedAtTimestampRef.current
			);

			const shouldShowWarningBar = warningDataRef && warningDataRef.current && isNewWarningGreater(
				state.closedConcurrentEditingWarningLevel,
				warningDataRef.current.warningType
			);

			if (shouldShowWarningBar) {
				showWarning('polling');
			} else {
				setPollingWarning(null);
			}
		}
	}, [enableConcurrentEditing, state.heartbeatData, showWarning, warningDataRef, state.closedConcurrentEditingWarningLevel]);
	// end of concurrent_editing

	React.useEffect(() => {
		ga('Curation Tools', 'Curation Module - Editor Open');
	}, [ga]);

	const addPostCallback = React.useCallback((pos: CardIndex, url: string) => {
		addPost({ pos, url, cache: state.cache, dispatch: dispatchWithTimestamp, ga });
	}, [state.cache, ga, dispatchWithTimestamp]);

	const updateBlockCallback = React.useCallback((
		blockIndex: number,
		newBlock: {|
		autofill?: Autofill | null,
		layout?: CurationBlockLayout,
		blockType: CurationBlockTypeString,
		unbranded?: boolean
		|}) => {
		updateBlock({ blockIndex, newBlock, blogId, state, dispatch: dispatchWithTimestamp, useVideoPlaylist, onError });
	}, [blogId, onError, state, useVideoPlaylist, dispatchWithTimestamp]);

	const showErrors = React.useCallback((invalidCards: Array<CardIndex>) => {
		const invalidBlocks = [...new Set(invalidCards.map(card => card[0] + 1))];

		invalidCards.forEach((pos: CardIndex) =>
			dispatchWithTimestamp({ type: 'CardErrorAction', pos, error: 'This article slot is empty. Please insert an article in it before saving!' })
		);
		onError(`There is an empty article slot in block ${invalidBlocks.join(', ')}. Please insert an article in it before saving!`);
	}, [onError, dispatchWithTimestamp]);

	const onDrop = React.useCallback(() => {
		if (state.editMode === 'CardEditing') {
			dispatchWithTimestamp({ type: 'RemoveSelectedCardAction' });
			dispatchWithTimestamp({ type: 'CardDragEndAction' });
		}
	}, [state.editMode, dispatchWithTimestamp]);

	const blockBySelectedCardIndex = state.selectedCardIndex === null || state.selectedCardIndex === undefined ?
		null : state.editStack[state.undoPointer || 0][state.selectedCardIndex[0]];

	const context = {
		addPost: addPostCallback,
		updateBlock: updateBlockCallback,
		dispatch: dispatchWithTimestamp,
		selectedCardIndex: state.selectedCardIndex,
		selectedCard: state.selectedCardIndex && blockBySelectedCardIndex && blockBySelectedCardIndex.type === 'Standard' ?
			blockBySelectedCardIndex.cards[state.selectedCardIndex[1]] : null,
		selectedCardsBlock: blockBySelectedCardIndex,
		selectedBlockIndex: state.selectedBlockIndex,
		selectedBlock: state.selectedBlockIndex === null || state.selectedBlockIndex === undefined ? null :
			state.editStack[state.undoPointer || 0][state.selectedBlockIndex],
		editMode: state.editMode,
		cardErrors: state.cardErrors,
		loadingCards: state.loadingCards,
		loadingBlocks: state.loadingBlocks,
		numberOfBlocks: state.editStack[state.undoPointer || 0].length
	};

	const onCancelHandler = React.useCallback(() => state.editStack.length > 1 ? setShowConfirmationModal(true) : onCancel(), [state.editStack, onCancel]);

	const onSaveHandlerWithoutWarning = React.useCallback(() => {
		const blocks = state.editStack[state.undoPointer || 0];
		const invalidCards = getInvalidCards(blocks);

		if (invalidCards && invalidCards.length > 0) {
			showErrors(invalidCards);
			return;
		}

		onSave(blocks);
		ga('Curation Tools', 'Curation Module - Editor Save');
	}, [onSave, showErrors, state.editStack, state.undoPointer, ga]);

	// Before saving, we send a heartbeat event and show a warning if there are conflicts
	const onSaveHandler = React.useCallback(() => {
		if (enableConcurrentEditing && state.lastEditActionTimestamp) {
			getHeartbeat(state.lastEditActionTimestamp)
				.then(r => {
					dispatch({
						type: 'UpdateHeartbeatDataAction',
						data: r
					});

					if (currentUserRef && currentUserRef.current) {
						warningDataRef.current = shouldShowWarning(
							r,
							currentUserRef.current.id,
							prevUpdatedAtTimestampRef.current
						);
					}

					if (warningDataRef.current) {
						showWarning('modal');
						return;
					} else {
						onSaveHandlerWithoutWarning();
					}
				});
		} else {
			onSaveHandlerWithoutWarning();
		}

	}, [state.lastEditActionTimestamp, showWarning, onSaveHandlerWithoutWarning, enableConcurrentEditing, getHeartbeat]);

	const onWarningBarDismiss = React.useCallback(() => {
		setPollingWarning(null);

		if (warningDataRef.current) {
			dispatch({
				type: 'UpdateClosedConcurrentEditingWarningLevel',
				data: warningDataRef.current.warningType
			});
		}
	}, [setPollingWarning, warningDataRef, dispatch]);

	const confirmationModalCancelHandler = React.useCallback(() => setShowConfirmationModal(false), []);

	return (
		<Provider value={context}>
			{enableConcurrentEditing && !modalWarning && pollingWarning && <FixedWarningBar
				onCancel={onWarningBarDismiss}
				editors={pollingWarning.editors}
				type={pollingWarning.type}
			/>}
			{enableConcurrentEditing && modalWarning && <ConcurrentEditingWarning
				type={modalWarning.type}
				editors={modalWarning.editors}
				isOpen={true}
				blogName={blogName}
				onCancelEditing={props.onCancel}
				onCancel={() => {
					setModalWarning(null);
					setShowEditor(true);
				}}
				preloaded={modalWarning.preloaded}
				onSave={onSaveHandlerWithoutWarning}
			/>}
			{/* The Toolbar is rendered using a React Portal */}
			<HomepageEditToolbar
				showEditor={enableConcurrentEditing ? showEditor : true}
				container={toolbarContainer}
				blogName={blogName}
				hasFocusedElement={state.editMode === 'CardEditing' ? !!state.selectedCardIndex : state.selectedBlockIndex !== null}
				cardIsDragging={state.cardIsDragging}
				onCancel={onCancelHandler}
				onSave={onSaveHandler}
				dispatch={dispatchWithTimestamp}
				mode={state.editMode}
				isDraggable={false}
				onDrop={onDrop}
				targetOpacityEffects={false}
				canUndo={(state.undoPointer || 0) < state.editStack.length - 1}
				canRedo={(state.undoPointer || 0) > 0}
			/>
			{showEditor && <CurationBlockList
				{...state.cache}
				curationBlocks={state.editStack[state.undoPointer || 0]}
				isSatire={isSatire}
			/>}
			{showEditor && <ConfirmationModal
				isOpen={showConfirmationModal}
				onConfirm={onCancel}
				onKeepEditing={confirmationModalCancelHandler}
			/>}
		</Provider>
	);
}

export default Analytics(CuratedHomepageEditor);