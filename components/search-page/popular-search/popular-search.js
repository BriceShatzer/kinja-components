/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import Theme from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';

import type { BlogThemeName } from 'kinja-components/components/theme/theme';
import type { Locale } from 'kinja-magma/models/Locale';


export const Title = styled.span`
	margin-bottom: 10px;
`;

export const Keyword = styled.li`
	margin-bottom: 4px;
	color: ${props => props.theme.color.primary};
	cursor: pointer;

	&:hover {
		color: ${props => darken(0.1, props.theme.color.primary)};
	}
`;
const KeywordContainer = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0;
`;

export const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	text-align: center;

	${Title},
	${Keyword} {
		font-weight: bold;
		font-size: 15px;
		line-height: 19px;
	}

	${media.largeUp`
		padding: 8px 10px 10px;
		border: 1px solid ${props => props.blogTheme === 'default' ? props.theme.color.midgray : props.theme.color.primary};

		${Title} {
			margin-bottom: 14px;
			font-size: 18px;
			line-height: 22px;
		}

		${Keyword} {
			font-size: 20px;
			line-height: 24px;
			margin-bottom: 8px;
		}
	`}
`;


type Props = {
	blogName: string,
	keywords: Array<string>,
	locale: Locale,
	onClick: (keyword: string) => void,
	theme: BlogThemeName
}

export default function PopularSearch({
	blogName,
	keywords,
	locale,
	onClick,
	theme
}: Props) {
	const translate = createTranslate(translations, locale);

	return (
		<Theme blog={theme}>
			<Container blogTheme={theme}>
				<Title>{`${translate('Popular searches on')} ${blogName}`}</Title>
				<KeywordContainer>
					{keywords.map(keyword => <Keyword key={keyword} onClick={() => onClick(keyword)}>{keyword}</Keyword>)}
				</KeywordContainer>
			</Container>
		</Theme>
	);
}

PopularSearch.defaultProps = {
	locale: 'en-US'
};