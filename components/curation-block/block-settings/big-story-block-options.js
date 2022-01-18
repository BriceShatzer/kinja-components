// @flow

import * as React from 'react';
import styled from 'styled-components';
import { Wrapper as CheckboxWrapper } from '../../form/checkbox/checkbox';
import Textfield from '../../form/textfield18';
import { Container, SectionHeader, Column, ColumnWrapper, FieldHeaderLabel } from './components';

const MainContainer = styled(Container)`
	${CheckboxWrapper} {
		margin-bottom: 2rem;
	}

	${FieldHeaderLabel} {
		margin-bottom: 0;
	}
`;

type Props = {|
	defaultStoryLabel?: string | null,
	onChange: (storyLabel: string) => void
|}

export default function BigStoryBlockOptions(props: Props) {
	const { defaultStoryLabel, onChange } = props;

	return (
		<MainContainer>
			<SectionHeader>Big story block options</SectionHeader>
			<ColumnWrapper>
				<Column>
					<Textfield
						name="story-type-label"
						label="Block label"
						inlineHelp="If the label is too long, it might overlap other elements on the site."
						value={defaultStoryLabel || ''}
						onChange={onChange}
					/>
				</Column>
			</ColumnWrapper>
		</MainContainer>

	);
}