// @flow
import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../../theme';

export type LegacyRawHtmlProps = {
	value: string
};

const Wrapper = styled.div`
	border: 3px solid ${props => props.theme.color.alert};
	padding: 5px;
	margin-bottom: 20px;

	&::before {
		content: 'Before this post can be saved, this block must be removed.';
		font-size: 12px;
		display: inline-block;
	}

	table {
		margin-bottom: 0;
	}
`;

export default function LegacyRawHtml(props: LegacyRawHtmlProps) {
	return (
		<EnsureDefaultTheme>
			<Wrapper dangerouslySetInnerHTML={{__html: props.value}}/>
		</EnsureDefaultTheme>
	);
}
