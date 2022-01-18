/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../../theme';
import { ImpactHeaderToolbar, ImpactHeaderUploadRegion } from './';

import type { ImpactHeaderOverlay, ImpactTitleAlignment } from 'postbody/blockNodes/ImpactHeader';
import type { ImpactHeaderToolbarEventHandlers } from './impact-header-toolbar';

const ImpactHeaderEditorContainer = styled.div`
	width: 100%;
	height: auto;
`;

type Props = {
	titleAlignment: ImpactTitleAlignment,
	overlay: ImpactHeaderOverlay,
	handleMediaUpload: (target: string) => void,
	imageUploadRegionText?: string,
	imageUploadButtonText?: string,
	videoUploadButtonText?: string,
	isStandardVideo?: boolean,
	toolbarEventHandlers: ImpactHeaderToolbarEventHandlers,
	children: React.Node
};

export default function ImpactHeaderEditor(props: Props) {
	const {
		isStandardVideo,
		handleMediaUpload,
		imageUploadButtonText,
		imageUploadRegionText,
		videoUploadButtonText,
		overlay,
		titleAlignment,
		toolbarEventHandlers
	} = props;
	return (
		<EnsureDefaultTheme>
			<ImpactHeaderEditorContainer>
				<ImpactHeaderToolbar eventHandlers={toolbarEventHandlers} overlay={overlay} titleAlignment={titleAlignment} isStandardVideo={isStandardVideo} />
				{props.children ? (
					props.children
				) : (
					<ImpactHeaderUploadRegion
						imageUploadButtonText={imageUploadButtonText || 'Add featured image'}
						videoUploadButtonText={videoUploadButtonText || 'Add featured video'}
						handleMediaUpload={handleMediaUpload}
						uploadRegionText={imageUploadRegionText || 'Click to add a featured asset'}
					/>
				)}
			</ImpactHeaderEditorContainer>
		</EnsureDefaultTheme>
	);
}
