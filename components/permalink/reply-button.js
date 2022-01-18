// @flow
import * as React from 'react';
import styled from 'styled-components';

import Button, { ButtonInner } from '../buttons';
import BubbleAdd from '../icon19/BubbleAdd';
import Theme from '../theme';
import translations from './translations';
import createTranslate from '../translator';

import type { BlogThemeName } from '../theme/theme';
import type { Locale } from 'kinja-magma/models/Locale';


const StyledReplyButton = styled(Button)`
	width: 80px;
	height: 36px;
	margin: 0;
	border-radius: 5px;
	padding: 0 1rem;

	${ButtonInner} {
		height: inherit;
	}
`;

type ReplyButtonProps = {
	blogTheme: BlogThemeName,
	locale: Locale,
	onReplyClick: () => void
}

const ReplyButton = (props: ReplyButtonProps) => {
	const { blogTheme, locale, onReplyClick } = props;
	const translate = createTranslate(translations, locale);

	return (
		<Theme blog={blogTheme}>
			<StyledReplyButton fullwidth
				icon={<BubbleAdd />}
				label={translate('Reply')}
				labelPosition="after"
				onClick={onReplyClick}
			/>
		</Theme>
	);
};

ReplyButton.defaultProps = {
	locale: 'en-US'
};

export default ReplyButton;