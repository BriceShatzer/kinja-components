// @flow

import React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../theme';
import Button19 from '../button19';
import { Loading } from 'kinja-components/components/elements/loader';
import { cloudinaryResponseToImage } from '../form/image-upload/image-upload';
import { UserAvatar } from '../user-avatar';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import createTranslate from '../translator';
import translations from './translations';

import type { CloudinaryResponse } from '../form/image-upload/types';
import type { ErrorResponse, Image as ImageType } from '../types';
import type { Locale } from 'kinja-magma/models/Locale';


const AvatarWrapper = styled.div`
	display: flex;
	width: 120px;
	height: 120px;
	margin-bottom: 10px;
	border: 2px dashed ${({ theme }) => theme.color.midgray};
	border-radius: 50%;
	overflow: hidden;

	&:empty {
		background-color: ${({ theme }) => theme.color.whitesmoke};
	}
`;

const LoadingWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 34px;

	> * {
		margin: 0;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;


export type Props = {
	imageUploader: File => Promise<CloudinaryResponse>,
	locale: Locale,
	onChange: ImageType => void,
	onError?: ErrorResponse => void,
};

type DefaultProps = {
	locale: Locale
}

type State = {
	error: ?string,
	image: ?CloudinaryResponse,
	isLoading: boolean,
	file: ?File,
	uploading: boolean
};

export default class AvatarUploader extends React.Component<Props, State> {
	fileSelector: HTMLInputElement

	static defaultProps: DefaultProps = {
		locale: 'en-US'
	}

	constructor(props: Props) {
		super(props);
		this.fileSelector = this.buildFileSelector();
		this.state = {
			error: null,
			image: null,
			isLoading: false,
			file: null,
			uploading: false
		};
	}

	buildFileSelector = () => {
		const fileSelector = document.createElement('input');
		fileSelector.type = 'file';
		fileSelector.accept = 'image/gif, image/png, image/jpeg, image/bmp, image/webp, image/svg+xml';
		fileSelector.onchange = this.onImageChange;
		return fileSelector;
	}

	onImageChange = (event: SyntheticInputEvent<>) => {
		const file: File = event.target.files[0];
		this.setState({ file, uploading: true }, () => {
			this.upload(file);
		});
	}

	upload = (image: File): Promise<CloudinaryResponse | ErrorResponse>=> {
		const uploadSuccess = (response: CloudinaryResponse) => {
			this.setState({ error: null, image: response, isLoading: false });
			const uploadedImage = cloudinaryResponseToImage(response);
			this.props.onChange(uploadedImage);
			return response;
		};

		const uploadFailure = (response: ErrorResponse) => {
			const error = response.meta && response.meta.error ? response.meta.error.message : 'Upload Error';
			this.setState({ error, isLoading: false });
			if (this.props.onError) {
				this.props.onError(response);
			}
			return response;
		};

		this.setState({ isLoading: true });
		return this.props.imageUploader(image).then(uploadSuccess, uploadFailure);
	}

	onUploadClick = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		this.fileSelector.click();
	}

	render() {
		const translate = createTranslate(translations, this.props.locale);
		const { image, isLoading } = this.state;

		return (
			<EnsureDefaultTheme>
				<Container>
					{image
						? (
							<AvatarWrapper>
								<UserAvatar image={new SimpleImage({ id: image.public_id, format: image.format })}
									size="120px"
									square={true}
									transform="AvatarLargeAuto"
								/>
							</AvatarWrapper>
						) : (
							<AvatarWrapper />
						)
					}
					{isLoading
						? <LoadingWrapper><Loading /></LoadingWrapper>
						: <Button19 label={translate('Upload Avatar')} onClick={this.onUploadClick} isSmall variant="secondary" />
					}
				</Container>
			</EnsureDefaultTheme>
		);
	}
}