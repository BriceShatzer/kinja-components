// @flow

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../../theme';
import ExternalLinkErrorIcon from '../../icon19/ExternalLinkError';

import {
	NonSecureIframeEmbed,
	IframeContainer,
	Message,
	ExternalSource
} from './iframe-placeholder';

const IframeWrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const IframeUnsupported = ({
	children
}: {
	children: React.Node
}) => {
	return (
		<EnsureDefaultTheme>
			<IframeWrapper className='has-media has-embed has-video media-large'>
				<NonSecureIframeEmbed>
					<IframeContainer>

						<ExternalSource as="div" isUnsupported>

							<Message>
								<ExternalLinkErrorIcon />
								<span>
									{children}
								</span>
							</Message>

						</ExternalSource>

					</IframeContainer>
				</NonSecureIframeEmbed>
			</IframeWrapper>
		</EnsureDefaultTheme>
	);
};

export default IframeUnsupported;
