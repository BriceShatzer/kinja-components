/* @flow */

import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import querystring from 'querystring';

import { defaultTheme } from '../theme';
import loadMoreTranslations from './load-more-translations';
import Button from '../buttons';

// ICONS
import ChevronRightIcon from '../icon19/ChevronRight';

import Link from '../elements/link';
import createTranslate from '../translator';
import type { Locale } from 'kinja-magma/models/Locale';
import type Blog from 'kinja-magma/models/Blog';
import type Pagination from 'kinja-magma/models/Pagination';
import type { PageType } from 'kinja-magma/models/PageType';

export type LoadMoreProps = {
	// the current blog
	blog?: Blog,
	// the current page type
	pageType?: PageType,
	// paging data
	pagination: Pagination,
	// search query
	query?: ?string | ?Array<string>,
	// an optional label, defaults to 'More stories'
	label?: string
};

const LoadMoreWrapper = styled.div`
	margin: 20px 0 40px 0;
	text-align: center;

	button {
		font-family: ${defaultTheme.typography.primary.fontFamily};
		cursor: pointer;
	}
`;

/**
 * Blog recirculation module that renders a
 * list of posts to a blog. Formerly 'Pager'
 */
const LoadMore = ({
	blog,
	pageType,
	pagination,
	query,
	label = 'More stories'
}: LoadMoreProps) => {
	if (!pagination.next) {
		return null;
	}

	const locale: Locale = (blog && blog.locale) || 'en-US';
	const translate = createTranslate(loadMoreTranslations, locale);
	const startIndex = pagination.next ? pagination.next.startIndex : 0;
	const nextUrlParams = {
		startIndex: startIndex || null,
		startTime: pagination.next ? pagination.next.startTime || null : null,
		q: pageType === 'search' && query && startIndex ? query : null
	};

	Object.keys(nextUrlParams).forEach(key => nextUrlParams[key] === null && delete nextUrlParams[key]);

	const nextUrl = `?${querystring.stringify(nextUrlParams)}`;

	const loadMoreClickEvent = [`${['frontpage', 'tag', 'search'].includes(pageType) ? 'Front' : 'Story type'} page click`, `${label} click`];

	return (
		<div className={cx('row')}>
			<LoadMoreWrapper>
				<Link href={nextUrl} events={[loadMoreClickEvent]} rel="next">
					<Button
						className={cx('button', 'button--tertiary')}
						icon={<ChevronRightIcon />}
						label={translate(label)}
						weight='tertiary'
					/>
				</Link>
			</LoadMoreWrapper>
		</div>
	);
};

export default LoadMore;
