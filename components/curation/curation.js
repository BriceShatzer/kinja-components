/* @flow */

import * as React from 'react';
import classnames from 'classnames';
import CurationModule from './curation-module';
import CurationToolbar from '../curation-toolbar';
import styled from 'styled-components';
import media from '../../style-utils/media';
import { LayoutToolbarWrapper,LayoutToolbarSubWrapper } from '../toolbar-layout/toolbar-layout';
import Button19 from 'kinja-components/components/button19';
import type { CurationSettings, CurationCustomOptions } from '../types';
import type { CurationItemProps } from 'kinja-magma/models/CurationItem';
import type { Tag } from 'kinja-magma/models/Tag';
import type { StoryTypeId, CategoryId } from 'kinja-magma/models/Id';

export type CurationProps = {
	curationToolbarProps?: {
		saveHandler: () => mixed,
		toggleHandler: () => mixed
	},
	layoutProps: CurationSettings,
	hideToolbar?: boolean,
	hasPermission?: boolean,
	hasFetched?: boolean,
	forceEditMode?: boolean,
	curationCustomOptions?: CurationCustomOptions,
	disableAds?: boolean,
	toggleButton?: boolean,
	storyTypeId?: StoryTypeId,
	categoryId?: CategoryId,
	tag?: Tag
};

type State = {
	activeCard: *,
	isEditMode: boolean,
	isEditing: boolean,
	isSaving: boolean,
	isCloseButton: boolean,
	isOpenButton: boolean,
	itemIndex: number | null,
	tertiaryIndex: number | null,
	clearCuration: boolean
};

export const curationMountainClass = 'curation-mountain';
export const curationMountainToolbarClass = 'curation-mountain__toolbar';

const CurationToolbarWrapper = styled.div`
	position: absolute;
	left: 4px;
	top: 20px;
	z-index: 101;

	${media.mediumDown`
		display: none;
	`}
`;

const CurationWrapper = styled.div`
	${({ clearCuration }) => clearCuration && `
		.curation-mountain__module {
			display: none;
		}

		${CurationToolbarWrapper} {
			top: 0;
		}
	`}
	@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
		display: none;
	}

	position: relative;
	${LayoutToolbarWrapper} {
		display: inline-flex !important;
		&:hover {
			${LayoutToolbarSubWrapper} {
				display: flex !important;
			}
		}
	}

	${LayoutToolbarSubWrapper} {
		display: none !important;
	}
`;

const CurationToggleButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20px auto;
`;

class Curation extends React.Component<CurationProps, State> {
	constructor(props: CurationProps) {
		super(props);

		this.state = {
			activeCard: null,
			isEditMode: this.props.hasFetched || false,
			isEditing: false,
			isSaving: false,
			isCloseButton: false,
			isOpenButton: false,
			itemIndex: null,
			tertiaryIndex: null,
			clearCuration: false
		};
	}

	mountedNode: ?HTMLElement = null;

	handleClickOutside = (evt: MouseEvent): void => {
		if (!this.mountedNode) {
			return;
		}

		if ((!(evt.target instanceof HTMLElement) || this.mountedNode.contains(evt.target))	&&
			(evt.target instanceof HTMLElement && !evt.target.classList.contains('curation-mountain__module'))) {
			return;
		}

		const isButtonWrapperClass = (elementClass: string) => {
			return elementClass.match('^.*ButtonWrapper.*$');
		};

		// this is a temprary solution to declare the curation toolbar button
		// as an inside element and overwrite the clickoutsideHOC
		if (evt.target && evt.target instanceof HTMLElement) {
			const buttonWrapperClass = evt.target.getAttribute('class');
			if (buttonWrapperClass && isButtonWrapperClass(buttonWrapperClass)) {
				return;
			}
		}

		this.setActiveCard(null);
	}

	componentDidUpdate(prevProps: CurationProps, prevState: State) {
		// false is a valid value here so I'm checking against undefined explicitly
		if (this.props.forceEditMode !== undefined &&
			this.props.forceEditMode !== this.state.isEditMode) {
			this.setState({ isEditMode: this.props.forceEditMode});
		}
		if (window.ga && prevState.clearCuration !== this.state.clearCuration) {
			// curation analytics
			const eventLabel = this.state.clearCuration ? 'Remove' : 'Add';
			window.ga('send', 'event', 'Curation Tools', 'Curation Module', eventLabel);
		}
	}

	setActiveCard = (model: CurationItemProps | null, itemIndex?: number, tertiaryIndex?: number) => {
		return this.setState(prevState => ({
			...prevState,
			isCloseButton: false,
			isOpenButton: false,
			activeCard: model,
			itemIndex,
			tertiaryIndex
		}));
	}

	isEditing = (model: CurationItemProps) => {
		if (!model) {
			return false;
		}
		return this.state.activeCard === model;
	}

	isCard = (event: MouseEvent, isTertriary: boolean): boolean => {
		const { currentTarget } = event;

		return !!(currentTarget instanceof HTMLElement && currentTarget.dataset.card) || isTertriary;
	}

	hasContentEditable = (target: EventTarget): boolean => {
		return !!(target instanceof HTMLElement && target.contentEditable && target.contentEditable === 'true');
	}

	resetToggleState = (isEditMode?: boolean, isSaving?: boolean, isCloseButton?: boolean, isOpenButton?: boolean) => {
		this.setState({
			isEditMode: isEditMode || false,
			isSaving: isSaving || false,
			isCloseButton: isCloseButton || false,
			isOpenButton: isOpenButton || false
		});
	}

	toggleEditMode = (event?: Event) => {
		let isOpenButton;
		let isCloseButton;
		let isSaveButton;

		if (event) {
			isCloseButton = !!(event.currentTarget instanceof HTMLElement && event.currentTarget.dataset.closebutton === 'true');
			isOpenButton = !!(event.currentTarget instanceof HTMLElement && event.currentTarget.dataset.openbutton === 'true');
			isSaveButton = !!(event.currentTarget instanceof HTMLElement && event.currentTarget.dataset.savebutton === 'true');
		}

		this.setState(prevState => {
			if (window.ga && !prevState.isEditMode && !this.state.isSaving) {
				window.ga('send', 'event', 'Curation Tools', 'Curation Module - Editor Open');
			}

			return {
				...prevState,
				isEditMode: isOpenButton,
				isSaving: isSaveButton,
				isCloseButton,
				isOpenButton
			};
		});
	}

	toggleActiveCard = (evt: MouseEvent, model: CurationItemProps, itemIndex: number, tertiaryIndex?: number) => {
		const isTertriary = tertiaryIndex || tertiaryIndex === 0;

		if (evt.currentTarget instanceof HTMLElement && evt.currentTarget.querySelector('[data-emptycard]')) {
			return;
		}

		if (!model || !this.isCard(evt, Boolean(isTertriary))) {
			this.setActiveCard(null);
		}
		if (!this.state.isEditMode) {
			return;
		}
		if (!isTertriary && this.isEditing(model)) {
			return;
		}
		if (this.hasContentEditable(evt.target)) {
			return;
		}

		this.setActiveCard(model, itemIndex, tertiaryIndex);
	}

	toggleCurationModule = () => {
		this.setState(prevState => ({ clearCuration: !prevState.clearCuration }));
	}

	render() {
		const { curationCustomOptions, hasPermission, disableAds } = this.props;
		const isEditModeClass = this.state.isEditMode ? 'edit-mode' : '';

		return (
			<CurationWrapper className={classnames(
				curationMountainClass,
				'js_curation-editor-container',
				this.state.isEditMode ? 'Editor' : '',
				isEditModeClass
			)}>
				{hasPermission && curationCustomOptions && <CurationToolbarWrapper
					className="curation-mountain__toolbar"
				>
					{!this.props.hideToolbar && <CurationToolbar
						isEditMode={this.state.isEditMode}
						toggleHandler={this.toggleEditMode}
					/>}
				</CurationToolbarWrapper>}
				<div
					ref={node => this.mountedNode = node}
					className={curationMountainToolbarClass}
				>
					<CurationModule
						activeCard={this.state.activeCard}
						activeItem={this.state.itemIndex}
						activeTertiary={this.state.tertiaryIndex}
						cardOnBlur={this.toggleActiveCard}
						cardOnClick={this.toggleActiveCard}
						setActiveCard={this.setActiveCard}
						handleClickOutside={this.handleClickOutside}
						isEditMode={this.state.isEditMode}
						isEditing={this.isEditing}
						layoutProps={this.props.layoutProps}
						isSaving={this.state.isSaving}
						isCloseButton={this.state.isCloseButton}
						isOpenButton={this.state.isOpenButton}
						resetToggleState={this.resetToggleState}
						curationCustomOptions={curationCustomOptions || {}}
						disableAds={disableAds}
						clearCuration={this.state.clearCuration}
					/>
				</div>

				{this.state.isEditMode && <div>
					{this.props.toggleButton && <CurationToggleButton>
						<Button19
							label={this.state.clearCuration ? 'ADD CURATION MODULE' : 'REMOVE CURATION MODULE'}
							onClick={this.toggleCurationModule}
							variant="tertiary"
						/>
					</CurationToggleButton>}
				</div>}
			</CurationWrapper>
		);
	}
}

export default Curation;
