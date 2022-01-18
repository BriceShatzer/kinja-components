/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import AVClub from './svg/colored/TheAVClub.svg';
import Clickhole from './svg/colored/Clickhole.svg';
import Deadspin from './svg/colored/Deadspin.svg';
import Earther from './svg/colored/Earther.svg';
import Gizmodo from './svg/colored/Gizmodo.svg';
import Jalopnik from './svg/colored/Jalopnik.svg';
import Jezebel from './svg/colored/Jezebel.svg';
import Kotaku from './svg/colored/Kotaku.svg';
import Lifehacker from './svg/colored/Lifehacker.svg';
import Splinter from './svg/colored/Splinter.svg';
import TheInventory from './svg/colored/TheInventory.svg';
import TheRoot from './svg/colored/TheRoot.svg';
import TheOnion from './svg/colored/TheOnion.svg';
import TheTakeout from './svg/colored/TheTakeout.svg';
import GO from './svg/colored/GO.svg';
import Kinja from './svg/colored/Kinja.svg';

import AVClubMono from './svg/monochromed/TheAVClub.svg';
import ClickholeMono from './svg/monochromed/Clickhole.svg';
import DeadspinMono from './svg/monochromed/Deadspin.svg';
import EartherMono from './svg/monochromed/Earther.svg';
import GizmodoMono from './svg/monochromed/Gizmodo.svg';
import JalopnikMono from './svg/monochromed/Jalopnik.svg';
import JezebelMono from './svg/monochromed/Jezebel.svg';
import KotakuMono from './svg/monochromed/Kotaku.svg';
import LifehackerMono from './svg/monochromed/Lifehacker.svg';
import SplinterMono from './svg/monochromed/Splinter.svg';
import TheInventoryMono from './svg/monochromed/TheInventory.svg';
import TheRootMono from './svg/monochromed/TheRoot.svg';
import TheOnionMono from './svg/monochromed/TheOnion.svg';
import TheTakeoutMono from './svg/monochromed/TheTakeout.svg';
import GOMono from './svg/monochromed/GO.svg';
import KinjaMono from './svg/monochromed/Kinja.svg';

export const blogAvatars = {
	avclub: <AVClub/>,
	avclubMono: <AVClubMono/>,
	clickhole: <Clickhole/>,
	clickholeMono: <ClickholeMono/>,
	deadspin: <Deadspin/>,
	deadspinMono: <DeadspinMono/>,
	earther: <Earther/>,
	eartherMono: <EartherMono/>,
	gizmodo: <Gizmodo/>,
	gizmodoMono: <GizmodoMono/>,
	jalopnik: <Jalopnik/>,
	jalopnikMono: <JalopnikMono/>,
	jezebel: <Jezebel/>,
	jezebelMono: <JezebelMono/>,
	kotaku: <Kotaku/>,
	kotakuMono: <KotakuMono/>,
	lifehacker: <Lifehacker/>,
	lifehackerMono: <LifehackerMono/>,
	splinter: <Splinter/>,
	splinterMono: <SplinterMono/>,
	theinventory: <TheInventory/>,
	theinventoryMono: <TheInventoryMono/>,
	theroot: <TheRoot/>,
	therootMono: <TheRootMono/>,
	theonion: <TheOnion/>,
	theonionMono: <TheOnionMono/>,
	thetakeout: <TheTakeout/>,
	thetakeoutMono: <TheTakeoutMono/>,
	kinja: <Kinja/>,
	kinjaMono: <KinjaMono/>,
	gomedia: <GO/>,
	gomediaMono: <GOMono/>
};

type Props = {
	anchor?: boolean,
	name: string,
	size?: number,
	transparent?: boolean,
	monochrome?: boolean,
	className?: string
};

export const BlogAvatarWrapper = styled.span`
	display: flex;
	width: ${props => (props.pixelSize ? `${props.pixelSize}px` : 'inherit')};
	height: ${props => (props.pixelSize ? `${props.pixelSize}px` : 'inherit')};
	${props => (props.anchored && 'position: absolute; bottom: 0;')}
	${props => (props.transparent && 'position: absolute; top: 0;')}

	.SVGInline-svg {
		display: none;
	}

	svg {
		max-width: 100%;
		width: inherit;
		height: inherit;
		${props => props.monochrome && `
			fill: currentColor;
		`}
	}
`;

export const BlogAvatar = (props: Props) => {
	const { name, size, monochrome, className } = props || {};
	const key = monochrome ? `${name}Mono` : name;
	const avatar = blogAvatars[key];

	if (!avatar) {
		return null;
	}

	return <BlogAvatarWrapper pixelSize={size} monochrome={monochrome} className={className}>
		{avatar}
	</BlogAvatarWrapper>;
};

export default BlogAvatar;
