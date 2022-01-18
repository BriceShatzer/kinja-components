// @flow

import styled from 'styled-components';
import { SpaceBetweenBlocks } from './layouts/layout-styles';

const Placeholder = styled.div`
	width: 100%;
	height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.color.whitesmoke};
	color: ${props => props.theme.color.gray};
	border: 1px dashed ${props => props.theme.color.gray};
	border-radius: 5px;
	margin-bottom: ${SpaceBetweenBlocks};
`;

export default Placeholder;