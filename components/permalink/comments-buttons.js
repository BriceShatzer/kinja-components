// @flow
import * as React from 'react';
import styled from 'styled-components';

import Button from '../buttons';
import BubbleAdd from '../icon19/BubbleAdd';
import Theme from '../theme';
import translations from './translations';
import createTranslate from '../translator';

import type { BlogThemeName } from '../theme/theme';
import type { Locale } from 'kinja-magma/models/Locale';


const ShowAllButton = styled(Button)`
	border-radius: 5px;
	padding: 0 1rem;
`;

const StartTheDiscussionButton = styled(Button)`
	border-radius: 5px;
	padding: 0 1rem;
`;

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	max-width: 636px;
	height: 42px;
	margin: 0 auto;
`;

type Props = {
	activeTab?: 'community' | 'pending' | 'staff',
	blogTheme: BlogThemeName,
	locale: Locale,
	replyCount: number,
	onReplyClick: () => void,
	onShowAllClick: () => void
}

const CommentsButtons = (props: Props) => {
	const { activeTab, blogTheme, locale, replyCount, onReplyClick, onShowAllClick, ...rest } = props;
	const translate = createTranslate(translations, locale);
	let labelText = replyCount > 1 ? translate('Show all {replyCount} replies', { replyCount }) : translate('Show all {replyCount} reply', { replyCount });
	if (activeTab === 'community' || activeTab === 'pending') {
		labelText = translate('View staff discussion');
	} else if (activeTab === 'staff') {
		labelText = translate('View all replies');
	}

	const showAllLabel = replyCount && replyCount > 0 ? labelText : '';
	const startTheDiscussionLabel = translate('Start the discussion');

	return (
		<Theme blog={blogTheme}>
			<Container>
				{replyCount
					? <ShowAllButton label={showAllLabel} fullwidth onClick={onShowAllClick} {...rest} />
					: <StartTheDiscussionButton fullwidth
						icon={<BubbleAdd />}
						label={startTheDiscussionLabel}
						labelPosition="after"
						onClick={onReplyClick}
					/>
				}
			</Container>
		</Theme>
	);
};


CommentsButtons.defaultProps = {
	locale: 'en-US'
};

export default CommentsButtons;