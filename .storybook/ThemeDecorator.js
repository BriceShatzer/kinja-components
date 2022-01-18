import * as React from 'react';
import styled from 'styled-components';
import Theme from '../components/theme';
import { blogThemes } from '../components/theme/themes';

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 40px;
	> div {
		width: 50%;
	}
`;

export default ({children}) =>
	<Wrapper>
		{Object.keys(blogThemes).map((blog =>
			children(blog)
		))}
	</Wrapper>;
