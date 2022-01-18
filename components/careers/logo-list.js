// @flow

import * as React from 'react';
import styled from 'styled-components';

import { blogLogos } from '../blog-logo/blog-logo';

const Logos = styled.ul`
	width: 100%;
	max-width: 60rem;
	margin: 0 auto;
	padding: 0;
	display: flex;
	list-style: none;
`;

const LogoWrapper = styled.li`
	padding: 0 10px;
	flex: 1;

	& svg {
		width: auto;
		max-width: 100%;
		height: auto;
		display: inline-block;
		vertical-align: middle;
	}
`;

const Logo = ({href,image}: {href: string, image: React.Node}): React.Node =>
	<LogoWrapper>
		<a href={href} target="_blank" rel="noopener noreferrer">
			{image}
		</a>
	</LogoWrapper>;

export const LogoList = () =>
	<Logos>
		<Logo href="https://avclub.com/" image={blogLogos.avclub} />
		<Logo href="https://deadspin.com/" image={blogLogos.deadspin} />
		<Logo href="https://earther.com/" image={blogLogos.earther} />
		<Logo href="https://gizmodo.com/" image={blogLogos.gizmodo} />
		<Logo href="https://jalopnik.com/" image={blogLogos.jalopnik} />
		<Logo href="https://jezebel.com/" image={blogLogos.jezebel} />
		<Logo href="https://kotaku.com/" image={blogLogos.kotaku} />
		<Logo href="https://lifehacker.com/" image={blogLogos.lifehacker} />
		<Logo href="https://splinternews.com/" image={blogLogos.splinter} />
		<Logo href="https://theroot.com/" image={blogLogos.theroot} />
		<Logo href="https://theonion.com/" image={blogLogos.theonion} />
		<Logo href="https://clickhole.com/" image={blogLogos.clickhole} />
		<Logo href="https://theinventory.com/" image={blogLogos.theinventory} />
	</Logos>;
