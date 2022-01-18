// @flow

import styled from 'styled-components';

const Excerpt = styled.p`
	font-family: ${props => props.theme.typography.body.fontFamily};
	font-size: 16px;
	line-height: 1.7;
	margin-bottom: 0;
	text-align: left;
	color: ${props => props.theme.color.darksmoke};
`;

export default Excerpt;