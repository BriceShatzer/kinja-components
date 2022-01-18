/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Modal from '../../modal';
import Field from '../../form/textfield18';
import Button, { ButtonWrapper } from '../../buttons/Button';
import { colors } from '../../theme/themes';
import pick from 'lodash/pick';
import media from '../../../style-utils/media';
import ImagePicker from '../../form/image-picker';
import type { ImagesResponse } from 'kinja-magma/models/Image';
import type { SimpleImageJSON } from 'kinja-magma/models/SimpleImage';

const Content = styled.div`
	display: block;
	width: 400px;

	${media.mediumDown`
		width: 100%;
	`}
`;

const Title = styled.h1`
	text-align: left;
	font-size: 25px;
	line-height: 32px;
	margin-bottom: 0;
`;

const Tagline = styled.p`
	text-align: left;
	font-size: 16px;
	line-height: 21px;
	color: ${colors.darkgray};
`;

const Fields = styled.div`
	display: flex;
`;

const Footer = styled.div`
	display: flex;
	padding: 16px 0;
	border-top: 1px solid ${colors.lightgray};
	justify-content: center;

	${ButtonWrapper}:first-child {
		margin-right: 8px;
	}
`;

const TextFieldWrapper = styled.div`
	flex: 1;
`;

const ImagePickerWrapper = styled.div`
	margin-right: 32px;
	margin-bottom: 32px;
	width: 144px;

	p {
		color: ${colors.darkgray};
		font-size: 16px;
		line-height: 21px;
		margin-bottom: 4px;
	}
`;

type NavigationOverwrites = {
	displayName: string,
	tagline: string,
	avatar?: ?SimpleImageJSON
};

type State = {
	displayNameError?: string,
	taglineError?: string
} & NavigationOverwrites;

type Props = {
	displayName?: string,
	tagline?: string,
	avatar?: SimpleImageJSON,
	onClose: () => void,
	onSubmit: NavigationOverwrites => void,
	imageUploader: (image: string | File) => Promise<ImagesResponse>
};

export default class NavigationItemEditModal extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			displayNameError: '',
			taglineError: '',
			displayName: props.displayName || '',
			tagline: props.tagline || '',
			avatar: props.avatar || null
		};
	}
	onDisplayNameChange = (value: string) => {
		this.setState({
			displayName: value
		});
	}

	onTaglineChange = (value: string) => {
		this.setState({
			tagline: value
		});
	}

	onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
		if (event) {
			event.preventDefault();
		}
		this.props.onSubmit(pick(this.state, ['displayName', 'tagline', 'avatar']));
		this.props.onClose();
	}

	onAvatarChange = (value: ?SimpleImageJSON) => {
		this.setState({ avatar: value });
	}

	render() {
		return (
			<Modal isOpen>
				<Content>
					<Title>Edit Navigation Item</Title>
					<Tagline>These settings affect navigation only.</Tagline>
					<form onSubmit={this.onSubmit}>
						<Fields>
							<ImagePickerWrapper>
								<ImagePicker
									label='Image'
									transform='AvatarLargeAuto'
									defaultValue={this.props.avatar}
									onChange={this.onAvatarChange}
									imageUploader={this.props.imageUploader}
								/>
							</ImagePickerWrapper>
							<TextFieldWrapper>
								<Field
									name="displayName"
									error={this.state.displayNameError}
									label='Name'
									onChange={this.onDisplayNameChange}
									value={this.state.displayName}
								/>
								<Field
									name="tagline"
									error={this.state.taglineError}
									label='Tagline'
									onChange={this.onTaglineChange}
									value={this.state.tagline}
								/>
							</TextFieldWrapper>
						</Fields>
						<Footer>
							<Button
								onClick={this.props.onClose}
								label="Cancel"
								labelPosition="after"
								weight="secondary"
								type="button"
							/>
							<Button
								type="submit"
								label="Done"
								labelPosition="after"
								weight="primary"
							/>
						</Footer>
					</form>
				</Content>
			</Modal>
		);
	}
}
