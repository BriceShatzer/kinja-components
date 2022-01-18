/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import Button from '../../buttons/Button';

// ICONS
import GlobeIcon from '../../icon19/Globe';
import GearIcon from '../../icon19/Gear';
import WriteIcon from '../../icon19/Write';

const PublishingToolsContainer = styled.div`
	position: absolute;
	top: 50px;
	right: 0;
	padding: 15px;
	z-index: 11;
`;

export const ButtonWithLeftMargin = styled(Button)`
	margin-left: 15px;
`;

type Props = {
	handleEdit: () => Promise<*>,
	isPublished: boolean,
	handlePublish: (props: { isPublished: boolean }) => Promise<*>,
	handleSettings: () => void
};

export default function SpecialSectionPublishingTools(props: Props) {
	const { handleEdit, isPublished, handlePublish, handleSettings } = props;
	return (
		<PublishingToolsContainer>
			<Button
				label={'Settings'}
				icon={<GearIcon />}
				onClick={handleSettings}
				labelPosition="after"
			/>
			<ButtonWithLeftMargin
				label={isPublished ? 'Unpublish' : 'Publish'}
				icon={<GlobeIcon />}
				onClick={() => handlePublish({ isPublished: !isPublished })}
				labelPosition="after"
			/>
			<ButtonWithLeftMargin label="Edit" icon={<WriteIcon />} onClick={handleEdit} labelPosition="after" />
		</PublishingToolsContainer>
	);
}
