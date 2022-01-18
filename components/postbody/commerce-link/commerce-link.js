// @flow

import * as React from 'react';
import styled from 'styled-components';
import Button from 'kinja-components/components/button19';
import media from 'kinja-components/style-utils/media';
import { gridValue } from 'kinja-components/components/grid-utils';
import { KinjaInlineHelp } from 'kinja-components/components/form/textfield18/textfield';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';

type Props = {
	url: string,
	text: string,
	editable?: boolean
}

const Container = styled.aside`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 1.5rem;
`;

export const ButtonWrapper = styled.div`
	${media.mediumDown`
		width: 100%;
	`}

	${media.largeOnly`
		width: ${gridValue.large('6c')};
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('6c')};
	`}

	${media.xxlargeUp`
		width: ${gridValue.xxlarge('6c')};
	`}
`;

const CommerceButton = styled(Button)`
	justify-content: center;
	white-space: normal;
	text-align: center;
	font-family: ${props => props.theme.typography.primary.fontFamily};
`;

const InlineHelp = styled(KinjaInlineHelp)`
	&&& {
		font-size: 1rem;
		font-family: ${props => props.theme.typography.primary.fontFamily};
	}
`;

export default function CommerceLink(props: Props) {
	const { url, text, editable } = props;

	return (
		<EnsureDefaultTheme>
			<Container
				className={editable ? 'js_inset js_commerce-link' : null}
				contentEditable={false}
			>
				<ButtonWrapper>
					<CommerceButton
						label={text}
						href={url}
						tag="a"
						data-ga={`[["Post click", "Editorial commerce button", "${url}"]]`}
					/>
				</ButtonWrapper>
				<InlineHelp>G/O Media may get a commission</InlineHelp>
			</Container>
		</EnsureDefaultTheme>
	);
}