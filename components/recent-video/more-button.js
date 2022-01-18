/* @flow */
import React from 'react';
import styled from 'styled-components';
import ChevronRightIcon from '../icon19/ChevronRight';

type Props = {
	videoPageUrl: string
}

const Container = styled.div`
	display: block;
	text-align: center;
`;

// TODO switch this out with a regular `<Button primary>` component once that's cleaned up
const Button = styled.a`
	color: white !important;
	text-decoration: none !important;
	height: 32px;
	line-height: 32px;
	border-radius: 21px;
	font-size: 14px;
	padding: 0 2em;
	letter-spacing: 0.5px;
	cursor: pointer;
	display: flex;
	align-items: center;
	margin: 0 5px;
	background-color: ${props => props.theme.color.primary};
`;

const MoreButton = (props: Props) => (
	<Container>
		<Button href={props.videoPageUrl}>More videos <ChevronRightIcon /></Button>
	</Container>);

export default MoreButton;