// @flow

import * as React from 'react';
import styled from 'styled-components';

import { colors } from 'kinja-components/components/theme/themes';
import media from 'kinja-components/style-utils/media';
import { ButtonWrapper } from '../button19';

const TopHeroContent = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 1.125rem;
	right: 1.125rem;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 100%;
`;

const UnstyledTopHeroSection = ({
	id,
	className,
	children
}: {
	id?: string,
	className?: string,
	children: React.Node
}): React.Node =>
	<section className={className} id={id}>
		<TopHeroContent>
			<div>
				{children}
			</div>
		</TopHeroContent>
	</section>;

export const TopHeroSection = styled(UnstyledTopHeroSection)`
	margin-bottom: 2.25rem;
	height: 0;
	position: relative;
	background: ${props => props.background || colors.black};
	background-size: cover;
	background-repeat: no-repeat;

	padding-bottom: 78%;

	${media.mediumOnly`
		padding-bottom: 38%;
	`}
	${media.largeUp`
		padding-bottom: 26%;
	`}

	h1,
	a,
	a:hover {
		color: ${colors.white};
	}
	h1 {
		font-size: 2.375rem;
	}

	${ButtonWrapper} {
		display: inline-block;
		padding-left: 2rem;
		padding-right: 2rem;
		margin-bottom: 1rem;
	}
	${ButtonWrapper}:last-of-type {
		margin-bottom: 0;
	}
`;
