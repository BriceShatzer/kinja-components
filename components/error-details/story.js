/* @flow */

import * as React from 'react';
import ReactDOM from 'react-dom';
import {
	storiesOf,
	withDocs,
	blogGroup
} from 'base-storybook';
import ErrorDetails from './error-details';
import AnimatedBlogLogo from '../blog-logo/blog-logo-animated';
import README from './README.md';
import PageNotFoundError from 'kinja-magma/errors/PageNotFoundError';
import InternalServerError from 'kinja-magma/errors/InternalServerError';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 20px;
	min-width: 600px;
`;

class HydratedErrorDetailsComponent extends React.Component<blogGroup> {
	componentDidMount() {
		this.updateView();
	}
	componentDidUpdate(previousProps) {
		if (this.props.blogGroup !== previousProps.blogGroup) {
			this.updateView();
		}
	}
	render() {
		return (
			<Wrapper>
				<ErrorDetails name={this.props.blogGroup} error={new PageNotFoundError('https://avclub.com/c/nonexiststorytype')} />
			</Wrapper>
		);
	}

	updateView = () => {
		const animatedLogoContainer = document.getElementById('animatedLogo');
		if (animatedLogoContainer) {
			ReactDOM.hydrate(<AnimatedBlogLogo name={this.props.blogGroup} monochrome/>,animatedLogoContainer);
		}

	}


}

storiesOf('4. Components|ErrorDetails', module)
	.addDecorator(withDocs(README))
	.add('404', () => {
		const name = blogGroup();

		return (
			<HydratedErrorDetailsComponent blogGroup={name} />
		);
	})
	.add('500', () => {
		return (
			<Wrapper>
				<ErrorDetails error={new InternalServerError({
					message: 'Missing parameter: ids',
					code: 'INTERNAL_SERVER_ERROR',
					uid: 'mantle-f96e2ef4-3237-45df-b436-703c8d0b62db'
				})} name={blogGroup()}/>
			</Wrapper>
		);
	});
