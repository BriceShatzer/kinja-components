// @flow

import userLinks from './user-links';
import userFixture from '../../__stubs__/accountState.json';
import gizmodoFixture from '../../__stubs__/gizmodo.json';
import User from 'kinja-magma/models/User';
import Blog from 'kinja-magma/models/Blog';

const gizmodo = Blog.fromJSON(gizmodoFixture);
const superUser = User.fromAccountStateJSON(userFixture);
const normalUser = User.fromAccountStateJSON({
	...userFixture,
	accountState: {
		...userFixture.accountState,
		isSuperuser: false,
		isGmgMember: false,
		createdMillis: 1572890390000
	}
});
const editor = User.fromAccountStateJSON({
	...userFixture,
	accountState: {
		...userFixture.accountState,
		isSuperuser: false,
		isGmgMember: true,
		createdMillis: 1572890400001
	}
});
const sales = User.fromAccountStateJSON({
	...userFixture,
	accountState: {
		...userFixture.accountState,
		isSuperuser: false,
		isGmgMember: false,
		isSales: true,
		createdMillis: 1572890400001
	}
});
const userNotAllowedToPost = User.fromAccountStateJSON({
	...userFixture,
	accountState: {
		...userFixture.accountState,
		isSuperuser: false,
		isGmgMember: false,
		isSales: false,
		createdMillis: 1572890400001 // the date we disabled user-created blogs + 1 ms
	}
});

const defaultProps = {
	translate: str => str,
	ga: () => undefined,
	pageType: 'permalink',
	notificationCount: 0,
	currentUser: normalUser,
	features: { },
	onEditHomepageClick: () => {}
};

describe('<UserButton /> user links', () => {
	describe('normal user', () => {
		const results = userLinks(defaultProps);
		it('should return links for normal user', () => {
			expect(results).toMatchSnapshot();
		});
		it('should have proper url for the user', () => {
			expect((results.find(item => item.label === 'Your Profile') || {}).href).toBe(`//kinja.com/${userFixture.accountState.screenName}`);
		});
		it('should set the current blog when composing a post', () => {
			const results = userLinks({
				...defaultProps,
				blog: gizmodo
			});
			expect((results.find(item => item.label === 'Compose a Post') || {}).href).toBe(`//kinja.com/write?blogid=${gizmodo.id}`);
		});
		it('should include notification count', () => {
			const results = userLinks({
				...defaultProps,
				notificationCount: 5
			});
			expect((results.find(item => item.href === '//kinja.com/dashboard/notifications') || {}).label).toMatchSnapshot();
		});
		it('should display manage blogname when user is member of blog', () => {
			const results = userLinks({
				...defaultProps,
				blog: gizmodo
			});
			expect(results[4]).toMatchSnapshot();
		});
		it('should show manage your drafts when you are not a member of blog', () => {
			const results = userLinks({
				...defaultProps,
				blog: Blog.fromJSON({ ...gizmodoFixture, id: 9999999})
			});
			expect(results[4]).toMatchSnapshot();
		});
		it('should have a different url for managing special sections', () => {
			const results = userLinks({
				...defaultProps,
				blog: Blog.fromJSON({ ...gizmodoFixture, properties: { ...gizmodoFixture.properties, isLiveCustomKinja: true }})
			});
			expect(results[4]).toMatchSnapshot();
		});
	});
	describe('GMG members', () => {
		it('should return links for editors', () => {
			const results = userLinks({
				...defaultProps,
				currentUser: editor
			});
			expect(results).toMatchSnapshot();
		});
	});
	describe('Sales people', () => {
		it('should return links for sales people', () => {
			const results = userLinks({
				...defaultProps,
				currentUser: sales
			});
			expect(results).toMatchSnapshot();
		});
		it('should show biz tools on a blog', () => {
			const results = userLinks({
				...defaultProps,
				currentUser: sales,
				blog: gizmodo
			});
			expect(results.find(item => item.href === '//kinja.com/biztools/gizmodo')).toMatchSnapshot();
		});
		it('should show biz tools on a post', () => {
			const results = userLinks({
				...defaultProps,
				currentUser: sales,
				blog: gizmodo,
				postId: '1836019407'
			});
			expect(results.find(item => item.href === '//kinja.com/biztools/gizmodo/1836019407')).toMatchSnapshot();
		});
	});
	describe('Superusers', () => {
		it('should return links for superusers', () => {
			const results = userLinks({
				...defaultProps,
				currentUser: superUser
			});
			expect(results).toMatchSnapshot();
		});
	});
	describe('User is not allowed to post', () =>{
		it('shouldn\'t render compose a post and manage blog/manage your drafts',()=>{
			const results = userLinks({
				...defaultProps,
				currentUser: userNotAllowedToPost
			});
			expect(results).toMatchSnapshot();
		});
	});
});