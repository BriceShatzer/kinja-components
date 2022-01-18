/* @flow */
import * as React from 'react';
import { boolean, storiesOf, withDocs } from 'base-storybook';

import MetaInfo from './meta-info';
import README from './README.md';
import Theme from '../../../components/theme';

import post from '../../../__stubs__/stubbedAVClubPost.json';
import blog from '../../../__stubs__/avclub.json';

storiesOf('3. Elements|Post Elements/Meta', module)
	.addDecorator(withDocs(README))
	.add('Meta Info', () => {
		const shouldShowStoryTypes = boolean('shouldShowStoryTypes', true);
		const hideSubCategory = boolean('hideSubCategory', false);
		const withStoryType = boolean('withStoryType', true);
		const withCategory = withStoryType && boolean('withCategory', false);
		const withSubcategory = withStoryType && withCategory && boolean('withSubcategory', false);
		const isSponsored = boolean('isSponsored', false);
		const isEditorial = isSponsored && boolean('isEditorial', false);

		return (
			<Theme blog={blog.blogGroup}>
				{/* $FlowFixMe */}
				<MetaInfo
					blog={blog}
					category={withCategory && post.category}
					defaultBlogDisplayName={blog.displayName}
					defaultBlogGroup={blog.blogGroup}
					defaultBlogRecircGroup={blog.properties && blog.properties.recircGroup}
					hideSubCategory={hideSubCategory}
					index={0}
					isEditorial={isEditorial}
					isSponsored={isSponsored}
					pageType="frontpage"
					parentBlogName={blog.displayName}
					post={post}
					shouldShowStoryTypes={shouldShowStoryTypes}
					storyType={withStoryType && post.storyType}
					subcategory={withSubcategory && post.subcategory}
				/>
			</Theme>
		);
	});
