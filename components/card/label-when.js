/* @flow */

import * as React from 'react';
import { EnsureDefaultTheme } from '../theme';
import styled from 'styled-components';

type Props = {
	className: string,
	label: string,
	when: () => void
}

const Wrapper = styled.section`
	color: ${ props => props.theme.color.black };
`;


const LabelWhen = (props: Props) => {
	const { className = '', label = '', when } = props;
	const predicate = typeof when === 'function' ? when() : when;
	return predicate ? (
		<EnsureDefaultTheme>
			<Wrapper>
				<span className={className}>{label.toUpperCase()}</span>
			</Wrapper>
		</EnsureDefaultTheme>
	) : null;
};

export default LabelWhen;
