/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Button from '../../../buttons';
import Modal from '../../../modal';
import TextField18 from '../../../form/textfield18';
import { KinjaFormFieldWrapper } from '../../../form/textfield18/textfield';
import { validators } from '../../../form';
import type { ModalProps } from '../../types';
import { LinkNode, TextNode } from 'postbody/InlineNode';
import Link from 'kinja-magma/models/Link';

const ButtonContainer = styled.div`
	button {
		margin: 0 15px;
	}
`;

const ModalBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 20px;
	width: 720px;

	${KinjaFormFieldWrapper} {
		width: 400px;
	}
`;

type State = {
	label: string,
	url: string,
	urlError?: string,
	labelError?: string
};
type Props = {
	onSave: (LinkNode, string) => void,
	forUrls: string => Promise<Array<Link>>
} & ModalProps;

export default class SpecialSectionAddLinkModal extends React.Component<Props, State> {
	constructor() {
		super();
		this.state = { label: 'Read More', url: '' };
	}

	handleSave = () => {
		const urlError = validators.format.httpUrl()(this.state.url);
		const labelError = validators.length.minLength(1)(this.state.label);
		if (urlError || labelError) {
			const newState: State = { ...this.state };
			if (urlError) {
				newState.urlError = urlError;
			}
			if (labelError) {
				newState.labelError = labelError;
			}
			this.setState(newState);
		} else {
			this.props.forUrls(this.state.url).then(response => {
				if (!(response && response.length && response[0].meta)) {
					this.setState({ urlError: 'This is not a valid link url' });
				}
				const postId = response[0].meta.postId;
				this.props.onSave(new LinkNode([new TextNode(this.state.label)], this.state.url), postId);
			});
		}
	};

	render() {
		const { isOpen, onClose } = this.props;
		const { urlError, labelError } = this.state;
		return (
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalBody>
					<h3>Add Link Button To Module</h3>
					<TextField18
						name="label"
						label="Link Button Label"
						onChange={label => this.setState({ label })}
						inlineHelp=""
						error={labelError ? labelError : undefined}
						value={this.state.label}
					/>
					<TextField18
						name="url"
						label="Link URL"
						onChange={url => this.setState({ url })}
						inlineHelp=""
						error={urlError ? urlError : undefined}
						value={this.state.url}
					/>
					<ButtonContainer>
						<Button label="Cancel" weight="secondary" onClick={onClose} />
						<Button label="Save" onClick={this.handleSave} variant={urlError || labelError ? 'error' : undefined} />
					</ButtonContainer>
				</ModalBody>
			</Modal>
		);
	}
}
