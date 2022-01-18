/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import type { SimpleImageJSON } from 'kinja-magma/models/SimpleImage';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import { Image as ImageComponent } from '../../elements/image';
import EmbedThumb from '../../icon19/EmbedThumb';
import Trashcan from '../../icon19/Trashcan';
import Loading from '../../icon19/Loading';
import imageUrl from 'kinja-images/imageUrl';
import { StyledFeedback } from 'kinja-components/components/elements/feedback';
import Button19 from 'kinja-components/components/button19';
import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';
import { KinjaLabel, KinjaInlineHelp, KinjaFormFieldWrapper } from 'kinja-components/components/form/textfield18/textfield';
import type { ErrorResponse } from '../../types';
import type { ImagesResponse } from 'kinja-magma/models/Image';

type Props = {
	imageUploader: (image: string | File) => Promise<ImagesResponse>,
	defaultValue?: ?SimpleImageJSON,
	onChange: ?SimpleImageJSON => void,
	transform: string,
	label: string,
	inlineHelp?: string
};

type State = {
	error: ?string,
	value: ?SimpleImageJSON,
	loading: boolean
};

const ImageLabel = styled(KinjaLabel)`
	margin-bottom: 0.25rem;
`;

const HiddenFileInput = styled.input`
	visibility: hidden;
	position: absolute;
`;

const ImageWrapper = styled.div`
	max-width: 10rem;
	max-height: 10rem;
	margin-bottom: 0.5rem;
`;

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 0.5rem;

	button:first-child {
		margin-right: 0.5rem;
	}
`;

export default class ImagePicker extends React.Component<Props, State> {
	fileInput: { current: ?HTMLInputElement };
	errorResetTimeout: ?TimeoutID = null;
	constructor(props: Props) {
		super(props);

		this.state = {
			error: null,
			value: props.defaultValue || null,
			loading: false
		};

		this.fileInput = React.createRef();
	}

	onFileSelected = () => {
		if (!this.fileInput.current) {
			return;
		}
		const file = this.fileInput.current.files[0];
		this.setState({ loading: true });
		this.upload(file);
	}

	upload = (image: File | string): Promise<ImagesResponse | ErrorResponse> => {
		const uploadSuccess = (response: ImagesResponse) => {
			const uploadedImage = new SimpleImage({ id: response.public_id, format: response.format });
			const image = new Image();
			image.onload = () => {
				this.setState({ error: null, value: uploadedImage, loading: false });
				this.props.onChange(uploadedImage);
			};
			image.src = imageUrl(uploadedImage.id, this.props.transform, uploadedImage.format);
			return response;
		};
		const uploadFailure = (response: ErrorResponse) => {
			const error = response.meta && response.meta.error ? response.meta.error.message : 'Upload Error';
			this.setState({ error, loading: false });
			if (this.errorResetTimeout) {
				clearTimeout(this.errorResetTimeout);
			}
			this.errorResetTimeout = setTimeout(() => this.setState({ error: null }), 10000);
			return response;
		};
		this.setState({ error: null });
		return this.props.imageUploader(image).then(uploadSuccess, uploadFailure);
	}

	onRemoveClick = (event: SyntheticEvent<HTMLDivElement>) => {
		event.preventDefault();
		this.setState({
			value: null,
			error: null
		});
		this.props.onChange(null);
	}

	onUploadClick = () => {
		if (!this.fileInput.current) {
			return;
		}
		this.fileInput.current.click();
	}

	render() {
		const { value, loading, error } = this.state;

		return (
			<EnsureDefaultTheme>
				<KinjaFormFieldWrapper>
					<ImageLabel htmlFor="image" error={error}>
						{this.props.label}
					</ImageLabel>
					{value &&
						<ImageWrapper>
							<ImageComponent
								id={value.id}
								format={value.format}
								transform={this.props.transform}
							/>
						</ImageWrapper>
					}
					<ButtonRow>
						<Button19
							label='Upload image'
							labelPosition='after'
							variant="secondary"
							isSmall={true}
							icon={loading ? <Loading /> : <EmbedThumb/>}
							onClick={this.onUploadClick}
						/>
						{value && (
							<Button19
								label='Remove image'
								labelPosition='after'
								variant="secondary"
								isSmall={true}
								icon={<Trashcan />}
								onClick={this.onRemoveClick}
							/>
						)}
					</ButtonRow>

					{error && <StyledFeedback text={error} color='error' arrow='topleft' />}
					<KinjaInlineHelp>{this.props.inlineHelp}</KinjaInlineHelp>

					<HiddenFileInput type="file" id="image" onChange={this.onFileSelected} ref={this.fileInput} />
				</KinjaFormFieldWrapper>
			</EnsureDefaultTheme>
		);
	}
}
