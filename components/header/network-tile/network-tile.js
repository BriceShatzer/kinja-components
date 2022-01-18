// @flow

import React from 'react';
import styled from 'styled-components';
import BlogLogo, { LogoWrapper } from '../../blog-logo';
import Link from '../../elements/link';
import { gridValue } from '../../grid-utils';
import media from '../../../style-utils/media';

type Props = {
	blogName: string,
	tagline?: string,
	url: string,
	isScrollback?: boolean
};

export const Tile = styled.div`
	display: flex;
	padding: 1.5em 1em 1em 1em;
	font-size: 16px;
	line-height: 1.125;
	flex-direction: column;
	justify-content: space-between;
	text-align: left;
	color: #fff;

	${media.smallOnly`
		font-size: 14px;
		width: ${gridValue.small('3c')};
		height: ${gridValue.small('3c')};
		${LogoWrapper} {
			--scale: 0.42;
		}
	`}

	${media.mediumOnly`
		width: ${gridValue.medium('2c')};
		height: ${gridValue.medium('2c')};
		${LogoWrapper} {
			--scale: 0.58;
		}
	`}

	${media.largeOnly`
		width: ${gridValue.large('2c')};
		height: ${gridValue.large('2c')};
		${LogoWrapper} {
			--scale: 0.53;
		}
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('2c')};
		height: ${gridValue.xlarge('2c')};
		${LogoWrapper} {
			--scale: 0.42;
		}
	`}

	${media.xxlargeUp`
		width: ${gridValue.xxlarge('2c')};
		height: ${gridValue.xxlarge('2c')};
		${LogoWrapper} {
			--scale: 0.6;
		}
	`}
`;

const TileBack = styled.div`
	background-color: ${props => props.theme.color.primary};
`;

const NetworkTile = (props: Props) => {
	const {blogName, tagline = '', url, isScrollback} = props;

	return (
		<Link
			href={url}
			events={[['Network navigation', `Network Tile Click${isScrollback ? ' - scroll back' : ''}`, url.replace('//', ''), { metric20: 1}]]}
		>
			<TileBack>
				<Tile>
					<BlogLogo name={blogName} monochrome />
					<span>{tagline}</span>
				</Tile>
			</TileBack>
		</Link>
	);
};

export default NetworkTile;
