// @flow

import * as React from 'react';
import styled from 'styled-components';

import ChevronRight from '../icon19/ChevronRight';

const ReferencedComment = styled.footer`
	padding: 1.12rem;
	max-width: 800px;
	margin: 0 auto;
`;

const CommentInset = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	color: ${props => props.theme.color.primary};
	padding: 1rem;
	margin: 0 1rem;
	text-align: center;
	border-top: 1px solid ${props => props.theme.color.lightgray};
	border-bottom: 1px solid ${props => props.theme.color.lightgray};

	&:hover {
		color: ${props => props.theme.color.primary};
	}
`;

const CircleIcon = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid ${props => props.theme.color.primary};
	border-radius: 50%;
	height: 20px;
	width: 20px;
	margin-left: 7px;

	svg {
		width: 14px;
		height: 14px;
	}
`;

const AmpComments = ({
	commentEmbedURL,
	permalink
}: {
	commentEmbedURL: string,
	permalink: string
}) => {
	return (
		<>
			<amp-iframe
				width="300"
				height="300"
				frameborder="0"
				layout="responsive"
				sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
				resizable=""
				src={commentEmbedURL}
			>
				<div tabIndex="0" role="button" aria-label="Read more" overflow="" placeholder="">
					Read more!
				</div>
			</amp-iframe>
			<ReferencedComment>
				<CommentInset href={`${permalink}#replies`} rel="noopener noreferrer"
					target="_blank">
					<span>View full discussion</span>
					<CircleIcon>
						<ChevronRight/>
					</CircleIcon>
				</CommentInset>
			</ReferencedComment>
		</>
	);
};

export default AmpComments;
