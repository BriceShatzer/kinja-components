/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import media from '../../../style-utils/media';
import CategoryStreamSectionItems from './category-stream-section-items';
import { CategoryHeaderClick, CategoryViewAllClick } from '../analytics';
import Link from '../../elements/link';
import { StoryClick } from '../../stream/analytics';

import type { CategoryStreamSectionProps } from '../types';

const SectionWrapper = styled.div`
	margin-bottom: 1.875rem;
`;

const DisplayCategorySection = styled.div`
	${media.smallOnly`
		margin-left: -${p => p.theme.columnPadding};
		margin-right: -${p => p.theme.columnPadding};
	`}

	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		border-bottom: 1px solid ${p => p.theme.color.lightgray};
		margin-bottom: 15px;

		${media.smallOnly`
			margin-left: ${p => p.theme.columnPadding};
			margin-right: ${p => p.theme.columnPadding};
		`}

		h2 {
			margin-bottom: 5px;

			a {
				color: ${p => p.theme.color.black};
			}
		}
	}
`;

const ViewAll = styled(Link)`
	text-transform: uppercase;
	display: inline-block;
	align-self: center;
`;

/**
 * A section of the category stream, renders a list of category stream items
 */
function CategoryStreamSection({
	path,
	posts,
	title,
	pageType,
	blogGroup,
	newStaticStreamHeader
}: CategoryStreamSectionProps): React$Node {
	const href = `/c/${path}`;

	return (
		<DisplayCategorySection>
			<header>
				<h2>
					<Link href={href} events={[CategoryHeaderClick(title)]}>
						{title}
					</Link>
				</h2>
				<div>
					<ViewAll href={href} events={[CategoryViewAllClick(title)]}>
						View all
					</ViewAll>
				</div>
			</header>

			<SectionWrapper>
				<CategoryStreamSectionItems
					events={[StoryClick(title)]}
					posts={posts}
					pageType={pageType}
					blogGroup={blogGroup}
					newStaticStreamHeader={newStaticStreamHeader}
				/>
			</SectionWrapper>

		</DisplayCategorySection>
	);
}

export default CategoryStreamSection;
