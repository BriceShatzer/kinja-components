// @flow

import * as React from 'react';
import styled from 'styled-components';

import Theme from 'kinja-components/components/theme';
import Bubble from 'kinja-components/components/icon19/Bubble';
import BubbleAdd from 'kinja-components/components/icon19/BubbleAdd';
import Button from 'kinja-components/components/buttons';
import createTranslate from 'kinja-components/components/translator';
import translations from './translations';

import type { BlogThemeName } from 'kinja-components/components/theme/theme';
import type { Locale } from 'kinja-magma/models/Locale';


export const StyledButton = styled(Button)`
	border-radius: 5px;
`;

const ReplyButton = ({
	blogTheme,
	locale,
	onClick,
	replyCount
}: {
	blogTheme: BlogThemeName,
	locale: Locale,
	onClick?: () => void,
	replyCount: number
}) => {
	const translate = createTranslate(translations, locale);
	const labelText = replyCount > 1 ? translate('Show all {replyCount} replies', { replyCount }) : translate('Show all {replyCount} reply', { replyCount });
	const buttonLabel = replyCount ? translate(labelText) : translate('Write a reply');
	const icon = replyCount ? <Bubble /> : <BubbleAdd />;

	return (
		<Theme blog={blogTheme}>
			<StyledButton icon={icon} label={buttonLabel} labelPosition="after" onClick={onClick}/>
		</Theme>
	);
};


ReplyButton.defaultProps = {
	locale: 'en-US'
};

export default ReplyButton;