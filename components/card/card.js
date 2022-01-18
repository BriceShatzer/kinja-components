/* @flow */

import * as React from 'react';
import shortid from 'shortid';
import styled, { css } from 'styled-components';
import ToolbarItem from '../toolbar-item';
import ImageUpload from '../form/image-upload';
import Modal from '../modal';
import { sanitizeNodes } from '../../utils/dom';
import { EnsureDefaultTheme } from '../theme';
import StoryCard from './story-card';
import EmptyCard from './empty-card';

// ICONS
import ImageIcon from '../icon19/Image';
import TrashcanIcon from '../icon19/Trashcan';

const ToolbarWrapper = styled.div`
	position: absolute;
	display: flex;
	background-color: ${props => props.theme.color.white};
	z-index: 1;
	left: initial;
	right: 10px;

	${props => props.tertiaryChildIndex && css`
		&& {
			top: inherit;
			left: inherit;
			bottom: 0;
			right: 50%;
			transform: translate(50%,50%);
		}
	`}
`;

const CardWrapper = styled.div`
	position: relative;
	height: 100%;

	&[data-editing="true"] {
		outline: 2px solid ${props => props.theme.color.primary};
	}

	user-select: all;
	/* stylelint-disable */
	-webkit-user-drag: all;
	-moz-user-drag: all;
	-ms-user-drag: all;
	/* stylelint-enable */

	> div,
	img,
	a,
	p {
		user-select: none;
		/* stylelint-disable */
		-webkit-user-drag: none;
		-moz-user-drag: -moz-none;
		-ms-user-drag: none;
		/* stylelint-enable */
	}
`;

type State = {
	cardState: {
		headline?: {
			prev: string,
			next: string
		},
		excerpt?: {
			prev: string,
			next: string
		}
	},
	isEditing?: boolean,
	isEditMode?: boolean,
	isImageModalOpen?: boolean
};

type Props = {
	EmptyCard?: React.Component<*>,
	FeedCard?: React.Component<*>,
	StoryCard?: React.Component<*>,
	cardState?: any,
	children: any,
	deleteItemModel: (zoneIndex: number, itemIndex: number, tertiaryChildIndex?: number) => void,
	handleItemImageChange: (image: *, zoneIndex: number, itemIndex: number, tertiaryChildIndex?: number) => void,
	imageUploader: (image: string | File) => Promise<*>,
	isCondensed?: boolean,
	isEditMode?: boolean,
	isEditing?: boolean,
	itemIndex: number,
	model?: *,
	onBlur?: mixed,
	onClick?: mixed,
	relinkItemModel: (props: { model: *, zoneIndex: number, itemIndex: number}) => void,
	withToolbar?: boolean,
	draggable?: boolean,
	zoneIndex: number,
	saveCardStateChange: (state: State, model: *, itemIndex: number, zoneIndex: number) => void,
	setCardSwapState: (draggedItemIndex: number, draggedZoneIndex: number, droppedItemIndex: number, draggedZoneIndex: number) => void
};

type ToolBarProps = {
	tertiaryChildIndex: number
}

class Card extends React.Component<Props, State> {
	uniqueId: string

	Toolbar = (props: ToolBarProps) => {
		const { tertiaryChildIndex } = props;
		return (<EnsureDefaultTheme>
			<React.Fragment>
				<ToolbarWrapper tertiaryChildIndex={tertiaryChildIndex || tertiaryChildIndex === 0} className='editor-inline-toolbar inline-toolbar'>
					<ToolbarItem
						title="Replace Post Image"
						icon={<ImageIcon />}
						onClick={this.toggleImageModal}
					/>
					<ToolbarItem
						title="Delete Post"
						icon={<TrashcanIcon />}
						onClick={this.props.deleteItemModel.bind(null, this.props.zoneIndex, this.props.itemIndex, tertiaryChildIndex)}
					/>
				</ToolbarWrapper>
				<Modal
					fullscreen
					isOpen={this.state.isImageModalOpen}
					onClose={this.toggleImageModal}
				>
					<ImageUpload
						name="cardImage"
						imageUploader={this.props.imageUploader}
						onChange={this.handleImageChange.bind(null, this.props, tertiaryChildIndex)}
					/>
				</Modal>
			</React.Fragment>
		</EnsureDefaultTheme>);
	};

	handleImageChange = (props: Props, tertiaryChildIndex: number, image: *) => {
		const { zoneIndex, itemIndex } = props;
		this.toggleImageModal();
		this.props.handleItemImageChange(image, zoneIndex, itemIndex, tertiaryChildIndex);
	}

	toggleImageModal = () => {
		return this.setState(prevState => ({
			...prevState,
			isImageModalOpen: !prevState.isImageModalOpen
		}));
	}

	toggleIsEditing = (callback?: () => *) => {
		return this.setState(prevState => ({
			...prevState,
			isEditing: !prevState.isEditing
		}), callback);
	}

	toggleIsEditMode = () => {
		return this.setState(prevState => ({
			...prevState,
			isEditMode: !prevState.isEditMode
		}));
	}

	updateCardState = (nextState: *, callback?: () => *, overwrite?: boolean = false) => {
		const { itemIndex, zoneIndex, model } = this.props;
		let state;
		return this.setState(prevState => {
			if (overwrite) {
				state = {
					...prevState,
					cardState: {
						...nextState.cardState
					}
				};
				this.props.saveCardStateChange(state, model, itemIndex, zoneIndex);
				return state;
			}
			state = {
				...prevState,
				cardState: {
					...prevState.cardState,
					...nextState.cardState
				}
			};
			this.props.saveCardStateChange(state, model, itemIndex, zoneIndex);
			return state;
		}, callback);
	}

	sanitizeEditableContent = (el: Element) => {
		el.innerHTML = sanitizeNodes(el, ['#text', 'i', 'em', 'b', 'strong', 'u']).innerHTML;
		return el;
	};

	handleEditableContent = (data: { state: string, prev: string, tertiaryChildIndex?: number }, evt: *) => {
		const sanitizeWhitelist = ['headline', 'excerpt'];
		const editableContentEl = sanitizeWhitelist.indexOf(data.state) === -1
			? evt.target
			: this.sanitizeEditableContent(evt.target);

		this.updateCardState({
			cardState: {
				[data.state]: {
					prev: data.prev,
					next: editableContentEl.innerHTML,
					tertiaryChildIndex: data.tertiaryChildIndex
				}
			}
		});
	}

	handleEditableContentInput = (data: { truncateAt: number }, evt: *) => {
		const threshold = 10;
		const inputLength = evt.target.textContent ? evt.target.textContent.length : 0;
		if (data.truncateAt - inputLength >= 0 && inputLength <= data.truncateAt && data.truncateAt - inputLength <= threshold) {
			evt.target.style = 'outline-color: #eeb544; outline-width: 2px';
		} else if (inputLength > data.truncateAt) {
			evt.target.style = 'outline-color: #D24A1D; outline-width: 2px';
		} else {
			evt.target.style = '';
		}
	}

	resetCardState = () => {
		this.updateCardState({
			cardState: {}
		}, () => {}, true);
	}

	mountedNode: ?HTMLElement = null;

	state = {
		cardState: {},
		isEditing: false,
		isEditMode: false,
		isImageModalOpen: false
	}

	constructor(props: Props) {
		super(props);
		this.uniqueId = shortid.generate();
	}

	ondragstart = (event: SyntheticDragEvent<*>) => {
		event.dataTransfer.setData('draggedItemIndex', event.currentTarget.dataset.index);
		event.dataTransfer.setData('draggedZoneIndex', event.currentTarget.parentElement.parentElement.attributes.data.value);
	}

	ondragend = (event: SyntheticDragEvent<*>) => {
		event.currentTarget.style.opacity = 1;
	}

	ondragover = (event: SyntheticDragEvent<*>) => {
		event.preventDefault();
		event.currentTarget.style.opacity = 0.5;
	}

	ondragenter = (event: SyntheticDragEvent<*>) => {
		event.preventDefault();
	}

	ondragleave = (event: SyntheticDragEvent<*>) => {
		event.currentTarget.style.opacity = 1;
	}

	ondrop = (event: SyntheticDragEvent<*>) => {
		event.preventDefault();
		const draggedItemIndex = event.dataTransfer.getData('draggedItemIndex');
		const draggedZoneIndex = event.dataTransfer.getData('draggedZoneIndex');
		const droppedItemIndex = event.currentTarget.dataset.index;
		const droppedZoneIndex = event.currentTarget.parentElement.parentElement.attributes.data.value;
		this.props.setCardSwapState(draggedItemIndex, draggedZoneIndex, droppedItemIndex, droppedZoneIndex);
	}

	render() {
		const {
			FeedCard = null,
			cardState = this.state.cardState,
			children,
			isEditMode = this.state.isEditMode,
			isEditing = this.state.isEditing,
			model,
			onBlur,
			onClick,
			withToolbar,
			draggable
		} = this.props || {};

		if (!children) {
			throw new Error('<Card /> should be called with `children` as render props.');
		}

		const withTabIndex = isEditMode && isEditing ? {
			tabIndex: '0'
		} : {};

		const dragEvents = isEditMode && draggable ? {
			draggable,
			onDragStart: this.ondragstart,
			onDragEnter: this.ondragenter,
			onDragEnd: this.ondragend,
			onDragOver: this.ondragover,
			onDragLeave: this.ondragleave,
			onDrop: this.ondrop
		} : null;

		return (
			<EnsureDefaultTheme>
				<CardWrapper
					{...withTabIndex}
					id={this.uniqueId}
					onClick={onClick}
					onBlur={onBlur}
					data-card={true}
					data-editing={isEditing && isEditMode}
					data-index={this.props.itemIndex}
					{...dragEvents}
				>
					{children({
						FeedCard,
						StoryCard,
						EmptyCard,
						cardState,
						isEditing,
						isEditMode,
						model,
						handleEditableContent: this.handleEditableContent,
						handleEditableContentInput: this.handleEditableContentInput,
						resetCardState: this.resetCardState,
						Toolbar: withToolbar && this.Toolbar,
						ref: node => this.mountedNode = node,
						withToolbar
					})}
				</CardWrapper>
			</EnsureDefaultTheme>
		);
	}
}

export default Card;
