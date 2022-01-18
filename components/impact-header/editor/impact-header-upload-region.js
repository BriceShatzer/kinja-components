/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Button from '../../buttons/Button';

// ICONS
import EmbedThumbIcon from '../../icon19/EmbedThumb';
import VideoIcon from '../../icon19/Video';

import { EnsureDefaultTheme } from '../../theme';

const ButtonWithLeftMargin = styled(Button)`
	margin-left: 15px;
`;

const HeaderImageRegion = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px dashed ${({ theme }) => theme.color.midgray};
	background-color: ${({ theme }) => theme.color.whitesmoke};
	height: 141px;
	margin-top: 42px;

	button {
		margin-bottom: 15px;
	}
	p {
		margin-bottom: 0;
	}
`;

const ImpactHeaderUploadRegion = ({
	imageUploadButtonText,
	videoUploadButtonText,
	handleMediaUpload,
	uploadRegionText
}: {
	imageUploadButtonText: string,
	videoUploadButtonText: string,
	handleMediaUpload: (target: string, type?: string) => void,
	uploadRegionText: string
}) => (
	<EnsureDefaultTheme>
		<HeaderImageRegion>
			<div>
				<Button
					label={imageUploadButtonText}
					icon={<EmbedThumbIcon />}
					labelPosition="after"
					onClick={() => handleMediaUpload('impactHeader')}
				/>
				<ButtonWithLeftMargin
					label={videoUploadButtonText}
					icon={<VideoIcon />}
					labelPosition="after"
					onClick={() => handleMediaUpload('impactHeader', 'Video')}
				/>
			</div>
			<p>{uploadRegionText}</p>
		</HeaderImageRegion>
	</EnsureDefaultTheme>
);

export default ImpactHeaderUploadRegion;
