/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import { KinjaMetaProvider } from '../../hoc/context';
import BlockNodeList from '../../postbody/block-node-list';
import webRenderNode from '../../postbody/block-node-list/web-render-node';
import { EnsureDefaultTheme } from '../../theme';
import media from '../../../style-utils/media';

import type { BlockNode } from 'postbody/BlockNode';
import type { KinjaMeta } from 'kinja-components/components/hoc/context';

type Props = {
	className?: string,
	kinjaMeta?: KinjaMeta,
	postBody: Array<BlockNode>,
	isNativeAd?: boolean,
	nativeExcerpt?: string
};

export const ExcerptWrapper = styled.div`
	p {
		font-family: ${props => props.theme.typography.body.fontFamily};
		font-size: 16px;
		line-height: 1.7;
		margin-bottom: 0;
		text-align: left;
	}
	a {
		color: ${props => props.theme.color.bodytext};
		transition: color ${props => props.theme.linkTransition};
		box-shadow: inset 0 -2px 0 ${props => props.theme.color.primary};
		text-decoration: none;

		&:hover {
			color: ${props => props.theme.color.primary};
			text-decoration: none;
		}
	}
	iframe {
		max-width: 100%;
	}
	${media.mediumUp`
		.twitter-embed iframe {
			margin-left: auto;
			margin-right: auto;
			max-width: 75%;
		}
	`}
`;
const Excerpt = (props: Props) => {
	const { className, kinjaMeta, postBody, isNativeAd, nativeExcerpt } = props;

	return (
		<EnsureDefaultTheme>
			<KinjaMetaProvider value={kinjaMeta || {}}>
				<ExcerptWrapper className={className}>
					{!isNativeAd && (
						<BlockNodeList nodes={postBody} renderNode={webRenderNode} />
					)}
					{isNativeAd && (
						<div dangerouslySetInnerHTML={{__html: nativeExcerpt}} />
					)}
				</ExcerptWrapper>
			</KinjaMetaProvider>
		</EnsureDefaultTheme>
	);
};

export default Excerpt;
