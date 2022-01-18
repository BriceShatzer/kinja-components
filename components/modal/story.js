/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import Modal from './modal';
import Button from '../buttons';
import { defaultTheme } from 'kinja-components/components/theme';
import README from './README.md';


type ModalHolderProps = {
	fullscreenModal?: boolean
}
type ModalHolderState = {
	isModalOpen: boolean
}
class ModalHolder extends React.Component<ModalHolderProps, ModalHolderState> {
	constructor(props: ModalHolderProps) {
		super(props);

		this.state = {
			isModalOpen: false
		};
	}

	toggleModal = () => {
		this.setState(prevState => ({
			isModalOpen: !prevState.isModalOpen
		}));
	}

	render() {
		return (
			<div>
				<Button weight='primary' onClick={this.toggleModal} label='Open modal' />

				<Modal {...this.props} isOpen={this.state.isModalOpen} onClose={this.toggleModal}>
					<h4>Modal Content - takes react children</h4>
					<p>paragraph text</p>
				</Modal>
			</div>
		);
	}
}


storiesOf('3. Elements|Modal', module)
	.addDecorator(withDocs(README))
	.add('Regular', () => (
		<ModalHolder />
	))
	.add('Regular - no background', () => (
		<ModalHolder showBackground={false} />
	))
	.add('Transparent', () => (
		<ModalHolder transparent />
	))
	.add('Blurred', () => (
		<ModalHolder blur />
	))
	.add('Fullscreen', () => (
		<ModalHolder fullscreen />
	))
	.add('Lightbox', () => (
		<ModalHolder isLightbox fullscreen  backgroundColor={defaultTheme.color.darkBlackOverlay} />
	))
	.add('Content Padding', () => (
		<ModalHolder contentPadding />
	))
	.add('Content Padding + Regular', () => (
		<ModalHolder contentPadding regular />
	));
