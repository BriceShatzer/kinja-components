// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';

type Props = {
	title: string
}

const Title = `
	font-size: 1.5rem;
	line-height: 3.875rem;
	font-weight: bold;
	font-style: normal;
	margin: 0;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`;

const NavTitle = styled.h1`
	${Title}
`;

const HeaderTitle = (props: Props) => {
	const { title } = props;

	return (<Fragment>
		<NavTitle>{title}</NavTitle>
	</Fragment>);
};

export default HeaderTitle;
