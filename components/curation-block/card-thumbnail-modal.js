// @flow

import * as React from 'react';
import styled from 'styled-components';
import media from '../../style-utils/media';
import { gridValue } from '../grid-utils';
import Button from '../button19';
import Close from '../icon19/Close';
import Checkmark from '../icon19/Checkmark';
import ImagePicker from 'kinja-components/components/form/image-picker';
import uploadImage from 'kinja-magma/api/uploadImage';
import type { SimpleImageJSON } from 'kinja-magma/models/SimpleImage';


const Container = styled.div`
	${media.xlargeUp`
		width: ${gridValue.xlarge('6c')};
	`}
`;

const Title = styled.h2`
	margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding-top: 2rem;
	border-top: 1px solid ${props => props.theme.color.midgray};
`;

type Props = {|
	onCancel: () => void,
	onSave: ?SimpleImageJSON => void,
	defaultThumbnail?: SimpleImageJSON,
	imageAssetType: 'background' | 'thumbnail'
|}

export default function CardThumbnailModal(props: Props) {
	const { onCancel, onSave, defaultThumbnail, imageAssetType } = props;
	const [thumbnail, setThumbnail] = React.useState(defaultThumbnail || null);
	const [isButtonDisabled, setButtonDisabled] = React.useState(true);
	const onImageChange = React.useCallback((image: ?SimpleImageJSON) => {
		setThumbnail(image);
		setButtonDisabled(false);
	}, []);
	const onSaveCallback = React.useCallback(() => onSave(thumbnail), [onSave, thumbnail]);

	return (
		<Container>
			<Title>{imageAssetType === 'background' ? 'Change background image' : 'Change thumbnail'}</Title>
			<ImagePicker
				label="Custom thumbnail"
				transform="BlogLogoTall"
				defaultValue={thumbnail}
				onChange={onImageChange}
				imageUploader={uploadImage}
			/>
			<ButtonContainer>
				<Button
					variant="secondary"
					label="Cancel"
					icon={<Close />}
					labelPosition="after"
					onClick={onCancel}
				/>
				<Button
					label="Save thumbnail"
					icon={<Checkmark />}
					labelPosition="after"
					onClick={onSaveCallback}
					disabled={isButtonDisabled}
				/>
			</ButtonContainer>
		</Container>
	);
}