/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import Theme from 'kinja-components/components/theme';
import Button, { ButtonWrapper } from 'kinja-components/components/buttons/Button';
import Rotate from 'kinja-components/components/icon19/Rotate';
import { IconWrapper } from 'kinja-components/components/icon19/icon19';
import media from 'kinja-components/style-utils/media';
import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';

import type { BlogThemeName } from 'kinja-components/components/theme/theme';
import type { Locale } from 'kinja-magma/models/Locale';


const Title = styled.span`
	flex-shrink: 0;
	width: 70px;
	margin-right: 10px;
	font-size: 15px;
	line-height: 19px;
`;

const ClearText = styled.span`
	margin: 0 0 -2px 5px;
`;

export const ClearWrapper = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding-right: 16px;

	${IconWrapper},
	${ClearText} {
		color: ${props => props.theme.color.primary};
		transition: color 0.2s ease-out;
	}

	&:hover {
		${IconWrapper},
		${ClearText} {
			color: ${props => darken(0.1, props.theme.color.primary)};
		}
	}
`;


export const Container = styled.div`
	display: flex;
	align-items: center;
	width: 100vw;
	padding: 0 16px;
	margin: 0 -16px 18px;
	overflow-x: scroll;

	&::-webkit-scrollbar {
		display: none;
	}

	${ButtonWrapper} {
		margin-right: 8px;
	}

	${media.largeUp`
		padding: 0;
		margin: 0 0 31px;
		width: auto;

		${Title} {
			width: auto;
		}

		${ClearWrapper} {
			padding: 0;
		}
	`}
`;


type Props = {
	keywords: Array<string>,
	locale: Locale,
	onClear: () => void,
	onClick: (keyword: string) => void,
	theme: BlogThemeName
}

export default function RecentSearches({
	keywords,
	locale,
	onClear,
	onClick,
	theme
}: Props) {
	const translate = createTranslate(translations, locale);

	return (
		<Theme blog={theme}>
			<Container>
				<Title>{translate('Your recent searches')}</Title>
				{keywords.slice(0, 5).map(keyword => <Button key={keyword} weight="secondary"
					label={keyword} small onClick={() => onClick(keyword)}/>
				)}
				<ClearWrapper onClick={onClear}>
					<Rotate />
					<ClearText>Clear</ClearText>
				</ClearWrapper>
			</Container>
		</Theme>
	);
}

RecentSearches.defaultProps = {
	locale: 'en-US'
};