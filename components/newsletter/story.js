import React, { Component } from 'react';
import {
	storiesOf,
	radios,
	withDocs
} from 'base-storybook';
import { action } from '@storybook/addon-actions';
import README from './README.md';
import Blog from 'kinja-magma/models/Blog';
import gizmodo from '../../__stubs__/gizmodo.json';
import kotaku from '../../__stubs__/kotaku.json';
import Newsletter from './newsletter';
import Modal from '../modal';
import Button from '../buttons';

class ModalHolder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: true,
			emailAddress: ''
		};
	}

	toggleModal = () => {
		this.setState(prevState => ({
			isModalOpen: !prevState.isModalOpen
		}));
	}

	closeModal = () => {
		this.setState({ isModalOpen: false });
	}

	setEmailAddress = value => {
		this.setState({ emailAddress: value});
		console.log(this.state.emailAddress);
	}

	render() {
		return (
			<div>
				<Button weight='primary' onClick={this.toggleModal} label='Open modal' />

				<Modal {...this.props} isOpen={this.state.isModalOpen} onClose={this.toggleModal}>
					<Newsletter
						blog={this.props.blog}
						closeModal={() => this.setState({ isModalOpen: false })}
						subscribeClick={action('Subscribe Button Clicked')}
						loading={this.props.loading}
						successful={this.props.successful}
						error={this.props.error}
						emailAddress={this.state.emailAddress}
						setEmailAddress={this.setEmailAddress}
					/>
				</Modal>
			</div>
		);
	}
}

storiesOf('4. Components|Newsletter Modal', module)
	.addDecorator(withDocs(README))
	.add('Default Subscribe Modal', () => {
		const blogs = [
			Blog.fromJSON(gizmodo),
			Blog.fromJSON(kotaku)
		];

		const blogSelection = radios('Current Blog', {
			Gizmodo: '0',
			Kotaku: 1
		}, '0');

		const currentBlog = blogs[blogSelection];

		return (
			<ModalHolder
				blog={currentBlog}
				loading={false}
				successful={false}
				error=''
			/>
		);
	})
	.add('Loading State', () => {
		const blogs = [
			Blog.fromJSON(gizmodo),
			Blog.fromJSON(kotaku)
		];

		const blogSelection = radios('Current Blog', {
			Gizmodo: '0',
			Kotaku: 1
		}, '0');

		const currentBlog = blogs[blogSelection];

		return (
			<ModalHolder
				blog={currentBlog}
				loading
				successful={false}
				error=''
			/>
		);
	})
	.add('Success/Error State', () => {
		const blogs = [
			Blog.fromJSON(gizmodo),
			Blog.fromJSON(kotaku)
		];

		const blogSelection = radios('Current Blog', {
			Gizmodo: '0',
			Kotaku: 1
		}, '0');

		const successState = [
			null,
			false,
			true
		];

		const successStatus = radios('Success Status', {
			Null: '0',
			Error: '1',
			Success: '2'
		}, '2');

		const currentBlog = blogs[blogSelection];
		const currentStatus = successState[successStatus];

		return (
			<ModalHolder
				blog={currentBlog}
				loading={false}
				successful={currentStatus}
				error={successStatus === '1' ? 'An error occurred, try again' : null}
			/>
		);
	});
