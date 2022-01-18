/* @flow */

import styled from 'styled-components';

export const MultipleAuthorsElement = styled.div`
	display: flex;

	&:focus {
		outline: none;
	}
`;

export const AuthorElement = styled.span.attrs({
	role: 'button'
})`
	outline: 0;
`;