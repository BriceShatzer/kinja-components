/* @flow */

import React, { Component } from 'react';
import styled from 'styled-components';

type Props = {
	videos: boolean,
};

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid #ccc;
`;
const Heading = styled.h3`
	margin-bottom: 0;
	margin-right: 35px;
	color: ${props => props.videos ? '#000' : '#7d7d7d'};
`;
const Link = styled.a`
	&:hover {
		text-decoration: none;
	}
`;

export default class VideoAdminTopBar extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}
	render() {
		return (
			<Wrapper>
				<Link href='/video?kinja_video_page=on'>
					<Heading videos={this.props.videos}>Videos</Heading>
				</Link>
				<Link href='/video/playlist?kinja_video_page=on'>
					<Heading videos={!this.props.videos}>Playlists</Heading>
				</Link>
			</Wrapper>
		);
	}
}
