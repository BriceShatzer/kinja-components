/* @flow */

import React, { Component } from 'react';
import styled from 'styled-components';

import { Filefield, Textfield18 } from '../';
import createTranslate from '../../translator';
import translations from './translations';

import type { ErrorResponse, Image } from '../../types';
import type { CloudinaryResponse } from './types';
import type { TranslateFunction } from '../../translator';


const validImageURL = (value: string): boolean =>
	Boolean(value && value.length && (/(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi).test(value));

const empty = (value: string): boolean => value === '';

export const cloudinaryResponseToImage: CloudinaryResponse =>
	Image = ({ public_id, format, width, height, url }) => ({
		id: public_id,
		format,
		width,
		height,
		url
	});

type DefaultProps = {
	language: string
};

type Props = {
	imageUploader: (image: string | File) => Promise<CloudinaryResponse>,
	onChange: Image => void,
	onInputChange?: (image: string | File) => void,
	onError?: ErrorResponse => void,
	onUploadStarted?: (image: string | File) => void,
	value?: Image,
	language: string,
	enableDragAndDrop?: boolean
};

type State = {
	error: string,
	value: string | File,
	uploading: boolean
};

const ImageUploadTitle = styled.p`
	text-align: center;
	font-weight: 400;
	font-size: 1.312rem;
`;

const FileInputText = styled.p`
	white-space: nowrap;
`;

const ImageFileInput = styled.div``;

const ImageInputContainer = styled.div`
	display: flex;

	${ImageFileInput} {
		padding: 0 10px;

		label {
			padding: 0 10px;
			width: 100%;
		}
	}
`;

const UploadingMessage = styled.div`
	text-align: center;
	color: #eeb544;
`;

export default class ImageUpload extends Component<Props, State> {
	translate: TranslateFunction;

	onImageURLChange: string => void;
	onImageChange: SyntheticInputEvent<> => void;

	state = {
		error: '',
		value: '',
		uploading: false
	};

	static defaultProps: DefaultProps = {
		language: 'en-US'
	};

	constructor(props: Props) {
		super(props);

		this.translate = createTranslate(translations, props.language);

		if (props.value && props.value.url) {
			this.state = {
				error: '',
				value: props.value.url,
				uploading: false
			};
		}

		this.onImageURLChange = this.onImageURLChange.bind(this);
		this.onImageChange = this.onImageChange.bind(this);
	}

	componentWillReceiveProps(nextProps: Props) {
		const { language } = nextProps;

		if (language !== this.props.language) {
			this.translate = createTranslate(translations, language);
		}
	}

	onImageURLChange(value: string) {
		if (validImageURL(value)) {
			this.upload(value);
		} else {
			this.setState({ error: empty(value) ? '' : this.translate('This URL is invalid. Please use a valid image URL.') });
		}

		this.setState({ value });

		if (this.props.onInputChange) {
			this.props.onInputChange(value);
		}
	}

	onImageChange(event: SyntheticInputEvent<>) {
		const file: File = event.target.files[0];

		this.setState({ value: file, uploading: true });

		this.upload(file);

		if (this.props.onInputChange) {
			this.props.onInputChange(file);
		}
	}

	upload(image: string | File): Promise<CloudinaryResponse | ErrorResponse> {
		const uploadSuccess = (response: CloudinaryResponse) => {
			const uploadedImage = cloudinaryResponseToImage(response);
			this.setState({ error: '' });
			this.props.onChange(uploadedImage);
			return response;
		};
		const uploadFailure = (response: ErrorResponse) => {
			const error = response.meta && response.meta.error ? response.meta.error.message : 'Upload Error';
			this.setState({ error });
			if (this.props.onError) {
				this.props.onError(response);
			}
			return response;
		};
		if (this.props.onUploadStarted) {
			this.props.onUploadStarted(image);
		}
		return this.props.imageUploader(image).then(uploadSuccess, uploadFailure);
	}

	render() {
		const { error, value } = this.state;

		return (
			<div>
				<ImageUploadTitle>
					<span>{this.translate('Insert an image from the web')}</span>
				</ImageUploadTitle>
				{this.props.enableDragAndDrop ?
					<label>
						<Filefield
							name="fileUpload"
							onChange={this.onImageChange}
							error={value instanceof File ? error : null}
							accept="image/gif,image/png,image/jpeg,image/bmp,image/webp,image/svg+xml"
							hide={true}
						/>
						<img src="https://www.fillmurray.com/800/300"/>
					</label> : null}
				<ImageInputContainer>
					<Textfield18
						name="imageURL"
						label={this.translate('Paste the URL of the image')}
						onChange={this.onImageURLChange}
						error={typeof value === 'string' ? error : ''}
						value={typeof value === 'string' ? value : ''}
					/>
					<ImageFileInput>
						<FileInputText>
							<span className="show-for-small-only">{this.translate('Or upload one from your device')}</span>
							<span className="show-for-medium-up">{this.translate('Or upload one from your computer')}</span>
						</FileInputText>
						<Filefield
							name="fileUpload"
							onChange={this.onImageChange}
							error={value instanceof File ? error : null}
							accept="image/gif,image/png,image/jpeg,image/bmp,image/webp,image/svg+xml"
						/>
					</ImageFileInput>
				</ImageInputContainer>
				{this.state.uploading ? <UploadingMessage>Uploading...</UploadingMessage> : null}
			</div>
		);
	}

}
