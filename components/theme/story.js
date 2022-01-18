// @flow
import React from 'react';
import {
	storiesOf,
	withDocs,
	withThemes
} from 'base-storybook';
import styled from 'styled-components';
// $FlowFixMe
import Trending from '../sidebar/trending/trending';
// $FlowFixMe
import posts from '../sidebar/__fixtures__/sidebar-posts';
import SidebarPost from 'kinja-magma/models/SidebarPost';
import blog from '../../__stubs__/gizmodo.json';

import Theme from './index';
import README from './README.md';
import InlineNode from '../postbody/inline-node';
import { TextNode, LinkNode } from 'postbody/InlineNode';

const ThemeColumns = styled.div`
	display: flex;
	& > * + * {
		margin-left: 20px;
	}
`;
const TrendingWrapper = styled.div`
	width: 380px;
`;
const randomTheme = {
	color: {
		darkgray: 'lightgray',
		lightgray: 'darkgray',
		gray: 'red'
	},
	font: {
		primary: 'sans-serif'
	}
};

storiesOf('2. Styles & Utilities|Theme', module)
	.addDecorator(withDocs(README))
	.add('Trending Example', () =>
		<ThemeColumns>
			<TrendingWrapper>
				<h3>Without <i>Theme</i></h3>
				<p>Without Theme component the child component uses the default theme</p>
				<Trending
					posts={posts.map(post => SidebarPost.fromJSON(post))}
					currentBlog={blog}
					feature={{isOn: () => true}}
				/>
			</TrendingWrapper>
			<TrendingWrapper>
				<h3>With <i>Theme</i> not using the theme prop</h3>
				<p>With Theme component around child component it uses the default theme</p>
				<Theme>
					<Trending
						posts={posts.map(post => SidebarPost.fromJSON(post))}
						currentBlog={blog}
						feature={{isOn: () => true}}
					/>
				</Theme>
			</TrendingWrapper>
			<TrendingWrapper>
				<h3>With <i>Theme</i> using the theme prop</h3>
				<p>With Theme component using theme prop it&apos;s using the passed in theme (not extending the default theme but overwriting it)</p>
				<Theme theme={randomTheme}>
					<Trending
						posts={posts.map(post => SidebarPost.fromJSON(post))}
						currentBlog={blog}
						feature={{isOn: () => true}}
					/>
				</Theme>
			</TrendingWrapper>
		</ThemeColumns>
	);

storiesOf('2. Styles & Utilities|Theme', module)
	.addDecorator(withThemes)
	.addDecorator(withDocs(README))
	.add('InlineNode Example', () => {
		return (
			<InlineNode nodes={[
				new TextNode('Yesterday, the internet’s favorite code repository, GitHub, was hit by a '),
				new LinkNode([
					new TextNode('record 1.35-terabyte-per-second denial-of-service attack')
				], 'https://www.cyberscoop.com/github-denial-of-service-amplification-attack/'),
				new TextNode('—the most powerful recorded so far. Yet, the website only endured a few minutes of intermittent downtime.')
			]} />
		);
	});
