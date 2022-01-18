/* @flow */

// npm packages
import * as React from 'react';
import difference from 'lodash/difference';

// components
import { RelatedStoriesController } from '../../editor/related-stories';
import { LazyResponsiveImage } from '../../elements/image';
import { SpecialSectionMediaUploadModal, SpecialSectionConfirmationModal, SpecialSectionAddLinkModal } from './modals';
import { SponsoredLogoWrapper, RelatedStoriesContainer } from '../read-only/special-section';
import ImpactHeader from '../../impact-header';
import ImpactHeaderEditor from '../../impact-header/editor/impact-header-editor';
import Notification from '../../elements/notification';

// ICONS
import ArrowLeftIcon from '../../icon19/ArrowLeft';
import TrashcanIcon from '../../icon19/Trashcan';
import GearIcon from '../../icon19/Gear';

import SpecialSectionStreamEditor from './stream';
import SpecialSectionToolbar from './special-section-toolbar';
import { EnsureDefaultTheme } from '../../theme';

// utils and consts
import { cachebustUrl } from 'kinja-magma/utils/url/url';
import goToManageBlogPage from 'kinja-magma/utils/manageSpecialSectionUrl';
import { ImpactHeaderTitleAlignments, ImpactHeaderTitleOverlays } from 'kinja-components/components/impact-header/consts';

// models
import Lunchbox from 'kinja-magma/models/Lunchbox';
import Post from 'kinja-magma/models/Post';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import Tag from 'kinja-magma/models/Tag';

// types and blocknodes
import { LinkNode } from 'postbody/InlineNode';
import ImageNode from 'postbody/blockNodes/ImageNode';
import ImpactHeaderBlockNode from 'postbody/blockNodes/ImpactHeader';
import KinjaVideo from 'postbody/blockNodes/KinjaVideo';
import type { ExternalAPI } from 'kinja-components/components/editor/related-stories/types';
import type { LunchboxEditorProps } from 'kinja-magma/models/Lunchbox';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import type { NotificationType } from '../../elements/notification';
import type { Props as ButtonProps } from 'kinja-components/components/buttons/Button';

type State = {
	notificationMessage: string,
	showNotification: boolean,
	fullWidthNotification: boolean,
	impactHeader: ?ImpactHeaderBlockNode,
	notificationType: NotificationType,
	openModal: ?string,
	mediaUploadTarget: ?string,
	addLinkTarget: ?string,
	modalText: string,
	modalButtons: Array<ButtonProps>,
	editorialPosts: Array<Post>,
	editorialTags: Array<Tag>,
	editorialSectionHeading: string,
	customContent: Array<LunchboxEditorProps>
};

type Props = {
	impactHeader: ?ImpactHeaderBlockNode,
	saveSpecialSection: (state: State) => Promise<*>,
	imageUploader: (image: File | string) => Promise<*>,
	title: string,
	blogName: string,
	sponsoredLogo?: ?SimpleImage,
	getLoopingVideoSource?: (string) => Promise<?string>,
	fetchVideoMetadata?: (videoId: string) => Promise<VideoMeta>,
	editorialPosts?: Array<Post>,
	editorialTags?: Array<Tag>,
	editorialSectionHeading?: string,
	customContent: Array<Lunchbox>,
	videoResolver: string => Promise<KinjaVideo>,
	forUrls: string => Promise<Array<*>>,
	relatedStoriesApi: ExternalAPI,
	blogGroup?: string
};

export default class SpecialSectionEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			editorialPosts: this.props.editorialPosts || [],
			editorialTags: this.props.editorialTags || [],
			editorialSectionHeading: this.props.editorialSectionHeading || '',
			notificationMessage: '',
			showNotification: false,
			fullWidthNotification: false,
			impactHeader: this.props.impactHeader,
			notificationType: 'default',
			openModal: null,
			mediaUploadTarget: null,
			addLinkTarget: null,
			modalText: '',
			modalButtons: [],
			customContent: this.props.customContent.map(customContent => {
				const newLunchbox = new Lunchbox(customContent);
				return newLunchbox.getEditorProps();
			})
		};
	}

	handleSave = ({ redirect }: { redirect?: boolean }) => {
		const { impactHeader } = this.state;
		// if there's no impact header for this special section, throw an error.
		if (!impactHeader || !impactHeader.media || !impactHeader.media.id) {
			this.setState({
				notificationMessage: 'Please choose a header image for this special section.',
				showNotification: true,
				fullWidthNotification: true,
				notificationType: 'error'
			});
			return Promise.resolve();
		}
		// Save the current state of special sections on the back end.
		return this.props.saveSpecialSection(this.state).then(() => {
			this.setState(
				{
					notificationMessage: 'Save Successful.',
					showNotification: true,
					fullWidthNotification: false,
					notificationType: 'success'
				},
				() => {
					setTimeout(() => this.setState({ showNotification: false }), 3500);
				}
			);
			if (redirect) {
				// on successful save and preview, we want to refresh the page.
				window.location.replace(cachebustUrl(window.location.href));
			}
		});
	};

	handleCancel = () => {
		const cancelModalState = {
			modalText: 'You have unsaved changes. Are you sure you want to discard them?',
			modalButtons: [
				{
					label: 'Back to editing',
					iconName: 'arrow-left',
					icon: <ArrowLeftIcon />,
					onClick: () => {
						this.setState({ openModal: null });
					},
					labelPosition: 'after'
				},
				{
					label: 'Discard changes',
					iconName: 'trash-can',
					icon: <TrashcanIcon />,
					weight: 'secondary',
					onClick: () => {
						window.location.reload();
					},
					labelPosition: 'after'
				}
			],
			openModal: 'confirmation'
		};
		this.setState(cancelModalState);
	};

	handleSettings = () => {
		const leavePageModalState = {
			modalText: 'You have unsaved changes. Are you sure you want to go to Settings and discard them?',
			modalButtons: [
				{
					label: 'Stay here',
					iconName: 'arrow-left',
					icon: <ArrowLeftIcon />,
					onClick: () => {
						this.setState({ openModal: null });
					},
					labelPosition: 'after'
				},
				{
					label: 'Go to Settings',
					iconName: 'gear-icon',
					icon: <GearIcon />,
					weight: 'secondary',
					onClick: () => {
						goToManageBlogPage(this.props.blogName);
					},
					labelPosition: 'after'
				}
			],
			openModal: 'confirmation'
		};
		this.setState(leavePageModalState);
	};

	handleMediaUpload = (mediaUploadTarget: string, type: string = 'Image') => {
		this.setState({ openModal: type === 'Video' ? 'resolveVideo' : 'imageUpload', mediaUploadTarget });
	};

	saveUploadedMedia = (media: KinjaVideo | ImageNode) => {
		const { mediaUploadTarget } = this.state;
		if (mediaUploadTarget === 'impactHeader') {
			this.setState({
				impactHeader: new ImpactHeaderBlockNode({
					...this.state.impactHeader,
					media,
					titleAlignment: ImpactHeaderTitleAlignments.Below,
					overlay: ImpactHeaderTitleOverlays.Black
				}),
				openModal: null,
				mediaUploadTarget: null
			});
		} else {
			const { customContent } = this.state;
			const indexOfModuleToEdit = customContent.findIndex(mod => mod.id === mediaUploadTarget);
			if (indexOfModuleToEdit > -1) {
				// make a copy of the module we want to edit
				const newModule = { ...customContent[indexOfModuleToEdit] };
				// apply updates to the module - we don't support video in lunchboxes yet.
				const newEditedModule = media instanceof KinjaVideo ? newModule : { ...newModule, image: media };
				// never directly edit state;
				const newModules = customContent.slice();
				newModules.splice(indexOfModuleToEdit, 1, newEditedModule);
				this.setState({
					customContent: newModules,
					openModal: null,
					mediaUploadTarget: null
				});
			}
		}
	};

	handleAddLinkToModule = (addLinkTarget: string) => {
		this.setState({ openModal: 'addLink', addLinkTarget });
	};

	addLinkToModule = (link: LinkNode, postId: string) => {
		const { customContent, addLinkTarget } = this.state;
		const indexOfModuleToEdit = customContent.findIndex(mod => mod.id === addLinkTarget);
		if (indexOfModuleToEdit > -1) {
			// make a copy of the module we want to edit
			const newModule = { ...customContent[indexOfModuleToEdit] };
			// apply updates to the module
			const newEditedModule = { ...newModule, button: link, postId: postId && postId.length ? postId : null };
			// never directly edit state;
			const newModules = customContent.slice();
			newModules.splice(indexOfModuleToEdit, 1, newEditedModule);
			this.setState({
				customContent: newModules,
				openModal: null,
				addLinkTarget: null
			});
		}
	};

	render() {
		const {
			fullWidthNotification,
			notificationType,
			showNotification,
			notificationMessage,
			openModal,
			modalText,
			modalButtons,
			impactHeader,
			editorialPosts,
			editorialTags,
			editorialSectionHeading,
			customContent
		} = this.state;
		const { title, fetchVideoMetadata, getLoopingVideoSource, sponsoredLogo, relatedStoriesApi } = this.props;
		const impactHeaderToolbarEventHandlers = {
			handleDelete: () => this.setState({ impactHeader: null }),
			handleUpdateOverlay: overlay => this.setState({ impactHeader: new ImpactHeaderBlockNode({ ...this.state.impactHeader, overlay }) }),
			handleUpdateTitleAlignment: titleAlignment =>
				this.setState({ impactHeader: new ImpactHeaderBlockNode({ ...this.state.impactHeader, titleAlignment }) })
		};
		return (
			<EnsureDefaultTheme>
				<React.Fragment>
					{showNotification && (
						<Notification
							message={notificationMessage}
							hide={!showNotification}
							fullWidth={fullWidthNotification}
							type={notificationType}
							dismissable
							onDismiss={() => this.setState({ showNotification: false })}
						/>
					)}
					<ImpactHeaderEditor
						handleMediaUpload={this.handleMediaUpload}
						imageUploadButtonText="Choose header image"
						videoUploadButtonText="Choose header video"
						imageUploadRegionText="A header asset is always required"
						isStandardVideo={impactHeader && impactHeader.media && impactHeader.media.type === 'KinjaVideo' ? !impactHeader.media.isLooping : false}
						overlay={impactHeader && impactHeader.overlay ? impactHeader.overlay : 'White'}
						title={title}
						titleAlignment={impactHeader && impactHeader.titleAlignment ? impactHeader.titleAlignment : 'Below'}
						toolbarEventHandlers={impactHeaderToolbarEventHandlers}
					>
						{impactHeader && impactHeader.media ? (
							<ImpactHeader
								impactHeader={impactHeader}
								title={title}
								getLoopingVideoSource={getLoopingVideoSource}
								fetchVideoMetadata={fetchVideoMetadata}
							/>
						) : null}
					</ImpactHeaderEditor>
					{sponsoredLogo && sponsoredLogo.id && (
						<SponsoredLogoWrapper>
							<LazyResponsiveImage id={sponsoredLogo.id} noLazy />
						</SponsoredLogoWrapper>
					)}
					<SpecialSectionStreamEditor
						customContent={customContent}
						updateCustomContent={this.setState.bind(this)}
						handleAddLinkToModule={this.handleAddLinkToModule}
						handleMediaUpload={this.handleMediaUpload}
					/>
					<RelatedStoriesContainer>
						<RelatedStoriesController
							stories={editorialPosts}
							externalAPI={{
								...relatedStoriesApi,
								onStoryGridUpdated: (posts, tags) => {
									const stateUpdate = { ...this.state };
									let stateUpdateTouched = false;
									if (difference(posts, this.state.editorialPosts).length) {
										stateUpdate.editorialPosts = posts;
										stateUpdateTouched = true;
									}
									if (difference(tags, this.state.editorialTags).length) {
										stateUpdate.editorialTags = tags;
										stateUpdateTouched = true;
									}
									if (stateUpdateTouched) {
										this.setState(stateUpdate);
									}
								}
							}}
							tags={editorialTags}
							headline={editorialSectionHeading}
							maxRows={8}
							onHeadlineUpdated={editorialSectionHeading => this.setState({ editorialSectionHeading })}
						/>
					</RelatedStoriesContainer>
					<SpecialSectionMediaUploadModal
						isOpen={openModal === 'imageUpload' || openModal === 'resolveVideo'}
						onClose={() => this.setState({ openModal: null })}
						onUpload={media => this.saveUploadedMedia(media)}
						imageUploader={this.props.imageUploader}
						videoResolver={this.props.videoResolver}
						type={openModal === 'resolveVideo' ? 'Video' : 'Image'}
					/>
					<SpecialSectionConfirmationModal
						buttonProps={modalButtons}
						text={modalText}
						isOpen={openModal === 'confirmation'}
						onClose={() => this.setState({ openModal: null })}
					/>
					<SpecialSectionAddLinkModal
						isOpen={openModal === 'addLink'}
						onClose={() => this.setState({ openModal: null })}
						onSave={this.addLinkToModule}
						forUrls={this.props.forUrls}
					/>
					<SpecialSectionToolbar
						handleSave={this.handleSave}
						didError={notificationType === 'error' && showNotification}
						handleCancel={this.handleCancel}
						handleSettings={this.handleSettings}
					/>
				</React.Fragment>
			</EnsureDefaultTheme>
		);
	}
}
