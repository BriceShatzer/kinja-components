/* @flow */

import * as React from 'react';

import LoadMore from '../stream/load-more';

import type Tag from 'kinja-magma/models/Tag';

import type { LoadMoreProps } from 'kinja-components/components/stream/load-more';
import type { FeedStreamProps } from 'kinja-components/components/stream-new';

import { FeedStream } from '../stream-new';
import {
	LdJson,
	forStream
} from 'kinja-components/components/seo/structured-data';

export type TagPageProps = FeedStreamProps & LoadMoreProps & {
	tag: Tag
};

function TagPage({
	blog,
	pageType,
	tag,
	pagination,
	authors,
	posts,
	kinjaMeta,
	withExcerpt,
	simpleEmbiggen
}: TagPageProps) {
	const canonicalHost = blog ? blog.canonicalHost : 'kinja.com';
	return (
		<React.Fragment>
			<LdJson contents={forStream({
				name: blog ? blog.name : 'kinja',
				headline: tag.displayName,
				orgUrl: `https://${canonicalHost}`,
				logo: blog && blog.properties ? blog.properties.logoLink : null,
				posts
			})}/>

			<FeedStream
				authors={authors}
				blog={blog}
				isV2
				isV3={false}
				kinjaMeta={kinjaMeta}
				pageType={pageType}
				posts={posts}
				simpleEmbiggen={simpleEmbiggen}
				withExcerpt={withExcerpt}
				withPostTools={false}
				withAuthorAvatar
			/>

			<LoadMore
				blog={blog}
				pageType={pageType}
				pagination={pagination}
				query={tag.urlName}
			/>
		</React.Fragment>
	);
}

export default TagPage;
