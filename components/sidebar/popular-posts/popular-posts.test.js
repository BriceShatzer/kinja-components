import * as React from 'react';
import PopularPosts from './popular-posts';
import SidebarPost from 'kinja-magma/models/SidebarPost';
import fixtures from '../__fixtures__/sidebar-posts';

const posts = fixtures.map(SidebarPost.fromJSON);
import { shallow } from 'enzyme';

describe('<PopularPosts />', () => {
	it('should render by default', () => {
		const result = shallow(
			<PopularPosts
				posts={posts}
			/>
		).dive();
		expect(result).toMatchSnapshot();
	});
	describe('Headline', () => {
		it('Recent from one author', () => {
			const result = shallow(
				<PopularPosts
					posts={posts.slice(0, 1)}
					isRecent
				/>
			).dive().find('popular-posts__HeaderText');
			expect(result).toMatchSnapshot();
		});
		it('Recent from two authors', () => {
			const result = shallow(
				<PopularPosts
					posts={posts.slice(0, 2)}
					isRecent
				/>
			).dive().find('popular-posts__HeaderText');
			expect(result).toMatchSnapshot();
		});
		it('Recent from more authors', () => {
			const result = shallow(
				<PopularPosts
					posts={posts.slice(0, 3)}
					isRecent
				/>
			).dive().find('popular-posts__HeaderText');
			expect(result).toMatchSnapshot();
		});
		it('Popular videos from blog', () => {
			const result = shallow(
				<PopularPosts
					posts={posts}
					currentBlog={{
						displayName: 'Blog Display Name',
						isSatire: true
					}}
				/>
			).dive().find('popular-posts__HeaderText');
			expect(result).toMatchSnapshot();
		});
		it('Popular from blog', () => {
			const result = shallow(
				<PopularPosts
					posts={posts}
					currentBlog={{
						displayName: 'Blog Display Name'
					}}
				/>
			).dive().find('popular-posts__HeaderText');
			expect(result).toMatchSnapshot();
		});
	});
});
