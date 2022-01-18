/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../../theme';
import media from '../../../style-utils/media';

type Props = {
	className?: string,
	children: string,
	embiggened?: boolean,
	isExternalNativeAd?: boolean,
	level?: 1 | 2 | 3 | 4 | 5 | 6
};

export const SimpleHeadline = styled.h1`
	text-align: left;
	font-size: ${props => props.isExternalNativeAd ? '20px' : props.theme.typography.headlineSize};
	font-family: ${props => props.isExternalNativeAd ? props.theme.typography.serif.fontFamily : props.theme.typography.headline.fontFamily};
	line-height: ${props => props.theme.typography.headlineLineHeight};
	margin-top: 0;
	margin-bottom: 0;
	${media.mediumUp`
		margin-bottom: 8px;
	`}
`;

const EmbiggenedHeadline = styled(SimpleHeadline)`
	${media.mediumUp`
		font-size: ${props => props.theme.typography.embiggenedHeadlineSize};
		margin-bottom: 4px;
	`}
`;

const Headline = (props: Props) => {
	const { className, children, embiggened, isExternalNativeAd, level } = props;
	const HeadlineWrapper = embiggened ? EmbiggenedHeadline : SimpleHeadline;
	const useLevel = level ? `h${level}` : undefined;

	return (
		<EnsureDefaultTheme>
			<HeadlineWrapper
				className={className}
				isExternalNativeAd={isExternalNativeAd}
				dangerouslySetInnerHTML={{ __html: children }}
				as={useLevel}
			/>
		</EnsureDefaultTheme>
	);
};

export default Headline;
