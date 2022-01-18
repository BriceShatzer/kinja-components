/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

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
import GOMedia from './svg/colored/GOMedia.svg';
import Kinja from './svg/colored/Kinja.svg';
import KinjaDeals from './svg/colored/KinjaDeals.svg';
import KinjaVideo from './svg/colored/KinjaVideo.svg';

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
import GOMediaMono from './svg/monochromed/GOMedia.svg';
import KinjaMono from './svg/monochromed/Kinja.svg';
import KinjaDealsMono from './svg/monochromed/KinjaDeals.svg';
import KinjaVideoMono from './svg/monochromed/KinjaVideo.svg';

export type Props = {
	name: string,
	monochrome?: boolean,
	scale?: number
};

export const LogoScaleWrapper = styled.div`
	--scale: ${props => props.scaling};
	svg {
		${props => props.monochrome && `
			fill: currentColor;
		`}
	}
`;

export const logoSizes = {
	avclub: {
		width: 150,
		top: -40
	},
	clickhole: {
		width: 216,
		top: -4
	},
	deadspin: {
		width: 254,
		top: 0
	},
	earther: {
		width: 217,
		top: -1
	},
	gizmodo: {
		width: 225,
		top: 0
	},
	jalopnik: {
		width: 228,
		top: 0
	},
	jezebel: {
		width: 206,
		top: 0
	},
	kotaku: {
		width: 212,
		top: -10
	},
	lifehacker: {
		width: 180,
		top: -25
	},
	splinter: {
		width: 261,
		top: -7
	},
	theinventory: {
		width: 258,
		top: -13
	},
	theroot: {
		width: 205,
		top: -20
	},
	theonion: {
		width: 262,
		top: -22
	},
	thetakeout: {
		width: 140,
		top: -34
	},
	kinja: {
		width: 152,
		top: -22
	},
	gomedia: {
		width: 241,
		top: -20
	},
	kinjadeals: {
		width: 203,
		top: -10
	},
	kinjavideo: {
		width: 243,
		top: -6
	}
};

function logoSizeCSS() {
	let styles = '';
	for (const [logo, size] of (Object.entries(logoSizes): any)) {
		styles += `
			&.${logo} {
				width: calc(${size.width}px * var(--scale));
				svg {
					top: ${size.top}%;
				}
			}
		`;
	}
	return css` ${styles} `;
}

export const LogoWrapper = styled.div`
	position: relative;
	height: calc(32px * var(--scale));
	display: flex;
	flex-grow: 0;
	flex-shrink: 0;

	svg {
		position: absolute;
		transform-origin: top left;
		transform: scale(var(--scale));
	}

	${logoSizeCSS()}
`;

export const blogLogos = {
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
	gomedia: <GOMedia/>,
	gomediaMono: <GOMediaMono/>,
	kinjadeals: <KinjaDeals/>,
	kinjadealsMono: <KinjaDealsMono/>,
	kinjavideo: <KinjaVideo/>,
	kinjavideoMono: <KinjaVideoMono/>
};

const BlogLogo = ({
	name,
	scale = 1,
	monochrome = false
}: Props) => {
	const key = monochrome ? `${name}Mono` : name;
	const logo = blogLogos[key];

	if (!logo) {
		return null;
	}

	return (
		<LogoScaleWrapper
			scaling={scale}
			monochrome={monochrome}
		>
			<LogoWrapper
				blogName={name}
				className={name}
			>
				{logo}
			</LogoWrapper>
		</LogoScaleWrapper>
	);
};

export default BlogLogo;
