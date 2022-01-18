/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import type { ToggleProps, BlogProperty } from '../types';
import ToggleList from '../toggle-list';
import { EnsureDefaultTheme } from '../theme';
import { Saving } from '../elements/loader';
import { BLOG_PROPERTIES } from '../../config/consts';

type Props = {
	blogProperties: Array<BlogProperty>,
	profileApi: {
		updateBlogProperty: (payload: BlogProperty) => Promise<BlogProperty>,
		createBlogProperty: (payload: BlogProperty) => Promise<BlogProperty>,
		getBlogProperties: ({ blogId: number }) => Promise<Array<BlogProperty>>
	},
	currentBlogId: number
};

type BlogPropertyKeyMap = { hideViewCounts?: number, commentsDisabled?: number, noBlogBylines?: number };

type State = {
	toggleProps: Array<ToggleProps>,
	// keep track of the IDS for each of the blog properties in state
	blogPropIdsByKey: BlogPropertyKeyMap,
	isSaving: boolean
};

const PaddedSection = styled.section`
	padding: 60px 1.125rem 0;
`;

const FlexDiv = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
	h3 {
		margin-bottom: 0;
	}
`;

class BlogSettingsContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			toggleProps: this._getDefaultToggleProps(),
			blogPropIdsByKey: {},
			isSaving: false
		};
	}

	componentDidMount() {
		this.props.profileApi.getBlogProperties({ blogId: this.props.currentBlogId }).then(blogProperties => {
			const toggleProps = this._getTogglePropsFromBlogProperties(blogProperties);
			const blogPropIdsByKey = this._getBlogPropIdsByKey(blogProperties);
			this.setState(() => ({ toggleProps, blogPropIdsByKey }));
		});
	}

	_getDisplayNameForBlogProperty(key: string): string {
		switch (key) {
			case BLOG_PROPERTIES.HIDE_VIEWCOUNTS: {
				return 'Show number of pageviews';
			}
			case BLOG_PROPERTIES.HIDE_BYLINES: {
				return 'Show authors';
			}
			case BLOG_PROPERTIES.HIDE_COMMENTS: {
				return 'Show comments';
			}
			default: {
				return 'Unknown';
			}
		}
	}

	_getChangeHandler = (key: string): (boolean => void) => isChecked =>
		this.handleChange({ key, value: !isChecked, id: this.state.blogPropIdsByKey[key], blogId: this.props.currentBlogId });

	_getTogglePropsFromBlogProperties = (newBlogProperties: Array<BlogProperty>): Array<ToggleProps> =>
		this._getDefaultToggleProps().map(existingToggleProp => {
			const matchingBlogProperty = newBlogProperties.find(newBlogProperty => existingToggleProp.name === newBlogProperty.key);
			if (matchingBlogProperty) {
				const { key, value } = matchingBlogProperty;

				return {
					// The blogProperties represent the inverse of the toggle value; in other words, to
					// ENABLE pageviews we need hideViewcounts to be false.
					checked: !value,
					label: this._getDisplayNameForBlogProperty(key),
					name: key,
					onChange: this._getChangeHandler(key),
					small: false
				};
			} else {
				return existingToggleProp;
			}
		});

	_getDefaultToggleProps = () => [
		{
			name: BLOG_PROPERTIES.HIDE_BYLINES,
			checked: true,
			label: this._getDisplayNameForBlogProperty(BLOG_PROPERTIES.HIDE_BYLINES),
			onChange: this._getChangeHandler(BLOG_PROPERTIES.HIDE_BYLINES),
			small: false
		},
		{
			name: BLOG_PROPERTIES.HIDE_COMMENTS,
			checked: true,
			label: this._getDisplayNameForBlogProperty(BLOG_PROPERTIES.HIDE_COMMENTS),
			onChange: this._getChangeHandler(BLOG_PROPERTIES.HIDE_COMMENTS),
			small: false
		},
		{
			name: BLOG_PROPERTIES.HIDE_VIEWCOUNTS,
			checked: true,
			label: this._getDisplayNameForBlogProperty(BLOG_PROPERTIES.HIDE_VIEWCOUNTS),
			onChange: this._getChangeHandler(BLOG_PROPERTIES.HIDE_VIEWCOUNTS),
			small: false
		}
	];

	_getBlogPropIdsByKey = (blogProperties: Array<BlogProperty>): BlogPropertyKeyMap => {
		const blogPropertiesToInclude = this._getDefaultToggleProps().map(toggleProp => toggleProp.name);
		return blogProperties.reduce((accumulator: BlogPropertyKeyMap, blogProperty) => {
			if (blogPropertiesToInclude.includes(blogProperty.key)) {
				return { ...accumulator, [blogProperty.key]: blogProperty.id };
			} else {
				return accumulator;
			}
		}, {});
	};

	handleChange = (newBlogProperty: BlogProperty): void => {
		const apiCall = newBlogProperty.id ? this.props.profileApi.updateBlogProperty : this.props.profileApi.createBlogProperty;
		this.setState({
			isSaving: true
		});
		apiCall(newBlogProperty).then(response => {
			const togglePropResponse = {
				checked: !response.value,
				label: this._getDisplayNameForBlogProperty(response.key),
				name: response.key,
				onChange: this._getChangeHandler(response.key),
				small: false
			};
			const newTogglePropsArray = [...this.state.toggleProps].map(
				existingToggleProp => (existingToggleProp.name === togglePropResponse.name ? togglePropResponse : existingToggleProp)
			);
			const blogPropIdsByKey = { ...this.state.blogPropIdsByKey, [response.key]: response.id };
			this.setState(() => ({
				toggleProps: newTogglePropsArray,
				blogPropIdsByKey,
				isSaving: false
			}));
		});
	};

	render() {
		return (
			<EnsureDefaultTheme>
				<PaddedSection>
					<FlexDiv>
						<h3>Blog Post Settings</h3>
						<Saving isSaving={this.state.isSaving} />
					</FlexDiv>
					<ToggleList toggles={this.state.toggleProps} />
				</PaddedSection>
			</EnsureDefaultTheme>
		);
	}
}

export default BlogSettingsContainer;
