/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import Link from '../../elements/link';
import { PermalinkHeaderClick } from '../../permalink/analytics';
import media from '../../../style-utils/media';

type HeadlineProps = {
	headline: string,
	permalink: string,
	isVideo?: boolean,
	isSecondScroll?: boolean,
	wideRail?: boolean
}

const HeadTag = styled.h1`
	font-size: ${props => props.wideRail ? props.theme.typography.permalinkHeadlineSize.xxxlargeUp : props.theme.typography.permalinkHeadlineSize.mediumUp};
	font-family: ${props => props.theme.typography.headline.fontFamily};
	line-height: ${props => props.theme.typography.permalinkHeadlineLineHeight};

	${media.smallOnly`
		font-size: ${props => props.theme.typography.permalinkHeadlineSize.small};
	`}

	${props => props.isVideo && `
		${media.largeDown`
			font-size: 22px;
		`}

		${media.mediumUp`
			margin-bottom: 30px;
		`}
	`}
`;

const Header = styled.header`
	a {
		display: inline;
		color: ${props => props.theme.color.black};
	}

	a:hover {
		color: ${props => props.theme.color.black};
		text-decoration: underline;
	}
`;

const Headline = (props: HeadlineProps) => {
	return (
		<Header>
			<HeadTag isVideo={props.isVideo} as={props.isSecondScroll ? 'h2' : 'h1'} wideRail={props.wideRail}>
				<Link
					href={props.permalink} events={[PermalinkHeaderClick(props.permalink, props.isSecondScroll)]}
					dangerouslySetInnerHTML={{__html: props.headline}}
				/>
			</HeadTag>
		</Header>
	);
};

export default Headline;
