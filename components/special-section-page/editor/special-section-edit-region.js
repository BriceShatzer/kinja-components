/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import CloseIcon from '../../icon19/Close';
import { EnsureDefaultTheme } from '../../theme';
import Button from '../../buttons';
const DashedBorderSection = styled.section`
	border: 1px dashed ${({ theme }) => theme.color.midgray};
	width: 100%;
	max-width: 800px;
	height: 133px;
	margin: 30px auto;
	display: flex;
	clear: both;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	p {
		margin-bottom: 10px;
	}
`;
export default function SpecialSectionEditRegion({ onClickEdit }: { onClickEdit: () => void }) {
	return (
		<EnsureDefaultTheme>
			<DashedBorderSection>
				<p>This special section is empty</p>
				<Button label="Edit special section" icon={<CloseIcon />} onClick={onClickEdit} labelPosition="after" />
			</DashedBorderSection>
		</EnsureDefaultTheme>
	);
}
