// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { Autofill, TopHeader } from 'kinja-magma/models/CurationBlock';
import media from '../../../style-utils/media';
import { gridValue } from '../../grid-utils';
import AutofillSettings from './autofill-settings';
import HeaderSettings from './header-settings';
import BigStoryBlockOptions from './big-story-block-options';
import Button from '../../button19';
import RadioGroup from '../../form/radio-group';
import Radio from '../../form/radio';
import { SectionHeader, Column, Container as SettingsContainer } from './components';
import type { CurationBlock } from 'kinja-magma/models/CurationBlock';
import Close from '../../icon19/Close';
import Checkmark from '../../icon19/Checkmark';

const Title = styled.h2`
	margin-bottom: 2rem;
`;


const Container = styled.div`
	position: absolute;
	top: 0;
	margin: 3rem 0;
	padding: 2rem;
	border: 1px solid ${props => props.theme.color.lightgray};
	box-shadow: ${props => props.theme.color.lightgray} 0 10px 20px 0;

	${media.xlargeOnly`
		width: ${gridValue.xlarge('6c')};
	`}

	${media.xxlargeOnly`
		width: ${gridValue.xxlarge('6c')};
	`}

	${media.xxxlargeUp`
		width: ${gridValue.xxxlarge('6c')};
	`}
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	border-top: 1px solid ${props => props.theme.color.midgray};
	padding-top: 2rem;
`;

export type Props = {
	blogName: string,
	selectedBlock?: ?CurationBlock,
	defaultAutofill?: ?Autofill,
	defaultHeader?: ?TopHeader,
	defaultUnbranded?: boolean,
	onCancel: () => void,
	onSave: ({|
		autofill: ?Autofill,
		header: ?TopHeader,
		unbranded?: boolean,
		storyLabel?: string | null
	|}) => void
}

export default function StandardBlockSettings(props: Props) {
	const { onCancel, onSave, blogName, selectedBlock } = props;

	const isFeaturedStory = selectedBlock
	&& selectedBlock.type === 'Standard'
	&& selectedBlock.layout
	&& selectedBlock.layout.type === 'FeaturedStory';

	const featuredStoryCustomLabel = selectedBlock
		&& selectedBlock.type === 'Standard'
		&& selectedBlock.layout
		&& selectedBlock.layout.type === 'FeaturedStory'
		&& selectedBlock.layout.customStoryLabel
		? selectedBlock.layout.customStoryLabel : 'The Big Story';

	const [autofill, setAutofill] = React.useState<?Autofill>(props.defaultAutofill);
	const [storyLabel, setStoryLabel] = React.useState<string | null>(featuredStoryCustomLabel);
	const [header, setHeader] = React.useState<?TopHeader>(props.defaultHeader);
	const [unbranded, setUnbranded] = React.useState(props.defaultUnbranded);
	const [autofillHasError, setAutofillHasError] = React.useState(false);
	const [headerHasError, setHeaderHasError] = React.useState(false);
	const onAutofillChange = React.useCallback(autofill => {
		if (autofill instanceof Error) {
			return setAutofillHasError(true);
		}
		setAutofillHasError(false);
		setAutofill(autofill);
	}, []);
	const onStoryLabelChange = React.useCallback((storyLabel: string) => {
		setStoryLabel(storyLabel);
	}, []);
	const onHeaderValues = React.useCallback(({ title, url }) => {
		setHeader({
			title: title || '',
			customHeaderLink: url ? {
				url,
				text: 'Show all'
			} : undefined,
			links: []
		});
	}, []);
	const onHeaderChange = React.useCallback(header => {
		if (header instanceof Error) {
			return setHeaderHasError(true);
		}
		setHeaderHasError(false);
		setHeader(header);
	}, []);

	const onUnbrandedChange = React.useCallback(() => setUnbranded(unbranded => !unbranded), []);
	const onSaveClick = React.useCallback(() => onSave(
		{ autofill, header, unbranded, storyLabel }),
	[autofill, header, onSave, unbranded, storyLabel]);

	return (
		<Container>
			<Title>Block settings</Title>
			<SettingsContainer>
				<SectionHeader>Style</SectionHeader>
				<Column>
					<RadioGroup name="unbranded" onChange={onUnbrandedChange}>
						<Radio
							checked={!unbranded}
							label={`Use ${blogName}'s style`}
							value={false}
						/>
						<Radio
							checked={unbranded}
							label="Unbranded"
							inlineHelp="Use this for blocks with content from other sites, or sponsored content"
							value={true}
						/>
					</RadioGroup>
				</Column>
			</SettingsContainer>
			<AutofillSettings
				defaultAutofill={props.defaultAutofill}
				onChange={onAutofillChange}
				onHeaderValues={onHeaderValues}
			/>
			{isFeaturedStory && <BigStoryBlockOptions
				defaultStoryLabel={storyLabel}
				onChange={onStoryLabelChange}
			/>}
			<HeaderSettings
				defaultHeader={header}
				onChange={onHeaderChange}
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
					label="Save curation block"
					icon={<Checkmark />}
					labelPosition="after"
					disabled={autofillHasError || headerHasError}
					onClick={onSaveClick}
				/>
			</ButtonContainer>
		</Container>

	);
}
