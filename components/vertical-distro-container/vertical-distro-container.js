/* @flow */

import * as React from 'react';

import type { ToggleProps, Blog, BlogProperty } from '../types';
import { BLOG_PROPERTIES } from '../../config/consts';
import ToggleList from '../toggle-list';
import { Saving } from '../elements/loader';
import { EnsureDefaultTheme } from '../theme';
import styled from 'styled-components';

type Props = {
	blogId: number,
	profileApi: {
		updateBlogProperty: (payload: BlogProperty) => Promise<BlogProperty>,
		createBlogProperty: (payload: BlogProperty) => Promise<BlogProperty>,
		getBlogProperties: (payload: { blogId: number }) => Promise<Array<BlogProperty>>,
		getIdsOfVerticals: (payload: { query: string }) => Promise<Array<number>>,
		getBlogs: ({ ids: Array<number> }, { traditional: boolean }) => Promise<Array<Blog>>
	}
};

type State = {
	toggleProps: Array<ToggleProps>,
	isSaving: boolean,
	error?: ?string
};

const PaddedSection = styled.section`
	padding: 60px 1.125rem 0;
	h3 {
		margin-bottom: 0;
	}
`;

const GrayParagraph = styled.p`
	color: ${props => props.theme.color.gray};
`;

const ErrorParagraph = styled.p`
	color: ${props => props.theme.color.error};
`;

const FlexDiv = styled.div`
	display: flex;
	align-items: center;
	color: ${props => props.theme.color.gray};
`;

class VerticalDistroContainer extends React.Component<Props, State> {
	constructor() {
		super();
		this.state = {
			toggleProps: [],
			isSaving: false
		};
	}

	componentDidMount() {
		this.props.profileApi.getIdsOfVerticals({ query: `?blogId=${this.props.blogId}` }).then((verticalIds: Array<number>) => {
			const options = { traditional: true };
			this.props.profileApi.getBlogs({ ids: verticalIds }, options).then((verticals: Array<Blog>) => {
				const toggleProps = this._getTogglePropsFromBlogs(verticals);
				this.setState({ toggleProps });
			});
		});
	}

	static handleFetchErrors(error: { message: string }) {
		console.error('An error occurred trying to update vertical distribution settings', error.message);
	}

	_getTogglePropsFromBlogs = (blogs: Array<Blog>): Array<ToggleProps> =>
		blogs.map(blog => {
			const { properties, displayName, name } = blog;
			const autoRepostProp = properties && properties.autoRepostToParent;
			return {
				checked: autoRepostProp,
				label: displayName,
				name,
				onChange: () => this.handleChange(blog),
				small: false
			};
		});

	_getBlogPropId = (blogId: number): Promise<?number> =>
		this.props.profileApi.getBlogProperties({ blogId }).then(blogProps => {
			const autoPostProp = blogProps.find(blogProp => blogProp.key === BLOG_PROPERTIES.AUTO_REPOST_TO_PARENT) || {};
			return autoPostProp.id;
		});

	handleChange = (blog: Blog): void => {
		let apiCall: BlogProperty => Promise<BlogProperty>;
		let apiPayload: BlogProperty;
		let getBlogPropId: number => Promise<?number>;
		const autoRepostProp = blog.properties && blog.properties.autoRepostToParent;
		const hasAutoRepostProp = autoRepostProp !== undefined;

		// If an autoRepost property exists on this blog, we need to figure out the ID of that blogProperty in order to update it
		if (hasAutoRepostProp) {
			getBlogPropId = this._getBlogPropId;
			apiCall = this.props.profileApi.updateBlogProperty;
			apiPayload = { key: BLOG_PROPERTIES.AUTO_REPOST_TO_PARENT, value: !autoRepostProp, blogId: Number(blog.id) };
			// if there isn't an autoRepost property set on this blog yet, no need to fetch the blogProps and check for an id,
			// we'll just create a new one.
		} else {
			getBlogPropId = (blogId: number) => new Promise(resolve => resolve(blogId));
			apiCall = this.props.profileApi.createBlogProperty;
			apiPayload = { key: BLOG_PROPERTIES.AUTO_REPOST_TO_PARENT, value: true, blogId: Number(blog.id) };
		}
		this.setState({ isSaving: true, error: null });
		getBlogPropId(Number(blog.id)).then(maybeId => {
			if (maybeId && hasAutoRepostProp) {
				apiPayload.id = maybeId;
			}
			apiCall(apiPayload).then(
				response => {
					const togglePropFromResponse = {
						checked: response.value,
						label: blog.displayName,
						name: blog.name,
						onChange: () => this.handleChange({ ...blog, properties: { ...blog.properties, autoRepostToParent: response.value } }),
						small: false
					};
					const newTogglePropsArray = [...this.state.toggleProps].map(
						existingToggleProp => (existingToggleProp.name === togglePropFromResponse.name ? togglePropFromResponse : existingToggleProp)
					);
					this.setState(() => ({
						toggleProps: newTogglePropsArray,
						isSaving: false
					}));
				},
				error => this.setState({ isSaving: false, error: error.error.message })
			);
		});
	};

	render() {
		const MaybeError = ({ error }) => (error ? <ErrorParagraph>{error}</ErrorParagraph> : null);
		return (
			<EnsureDefaultTheme>
				<PaddedSection>
					<FlexDiv>
						<h3>Vertical Distribution</h3>
						<Saving isSaving={this.state.isSaving} />
					</FlexDiv>
					<p>Posts from verticals you select here will appear on the main blog.</p>
					<MaybeError error={this.state.error} />
					{this.state.toggleProps.length ? (
						<ToggleList toggles={this.state.toggleProps} />
					) : (
						<GrayParagraph>(There are no verticals for this blog.)</GrayParagraph>
					)}
				</PaddedSection>
			</EnsureDefaultTheme>
		);
	}
}

export default VerticalDistroContainer;
export {
	VerticalDistroContainer as VerticalDistroContainerWithoutHOC
};
