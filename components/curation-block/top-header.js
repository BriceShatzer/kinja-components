// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { TopHeader } from 'kinja-magma/models/CurationBlock';
import Link from '../elements/link';
import media from 'kinja-components/style-utils/media';
import { darken } from 'polished';
import { ResponsiveImage } from '../elements/image';
import StandardBlockContext from './standard-block-data-context';
import EditorContext from './editor-context';

type Props = {|
	header: TopHeader,
	className?: string
|}

export const HeaderLink = styled(Link)`
	:hover {
		text-decoration: none;
	}
`;

export const ShowAllLink = styled(HeaderLink)`
	flex: 0 0 auto;
	font-family: ${props => props.theme.typography.utility.fontFamily};
	font-size: ${props => props.theme.typography.utility.fontSizes.xsmall};
	line-height: ${props => props.theme.typography.utility.lineHeights.xsmall};
	text-transform: uppercase;
	font-weight: 600;
	/* a 1-pixel vertical offset is used because Show All links are all caps, and type vertical position is optimized for regular text */
	position: relative;
	top: 1px;
`;

export const ShortLinkText = styled.span`
	${media.largeUp`
		display: none;
	`}
`;

export const LongLinkText = styled.span`
	${media.mediumDown`
		display: none;
	`}
`;

export const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${props => props.theme.color.primary};
	border-top: 1px solid ${props => props.unbranded ? props.theme.color.darkgray : props.theme.color.primary};
	margin-bottom: 1rem;
	padding-top: 1rem;
	pointer-events: ${props => props.editMode && 'none'};

	h2 {
		color: ${props => props.unbranded ? props.theme.color.darkgray : props.theme.color.primary};
		font-weight: 600;
		margin: 0;
		/* Change to headline font once onion frontpage is released  */
		font-family: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.fontFamily :
		props.theme.typography.headline.fontFamily};
		font-size: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.fontSizes.medium :
		props.theme.typography.headline.fontSizes.medium};
		line-height: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.lineHeights.medium :
		props.theme.typography.headline.lineHeights.medium};

		${media.mediumUp`
			/* Change to headline font once onion frontpage is released */
			font-size: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.fontSizes.large :
		props.theme.typography.headline.fontSizes.large};
			line-height: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.lineHeights.large :
		props.theme.typography.headline.lineHeights.large};
		`}
	}

	${HeaderLink} {
		color: ${props => props.unbranded ? props.theme.color.darkgray : props.theme.color.primary};

		:hover {
			color: ${props => props.unbranded ? props.theme.color.darksmoke : darken(0.1, props.theme.color.primary)};
		}
	}
`;

const LogoContainer = styled.div`
	position: relative;
	height: 2.5rem;
	width: 100%;
	pointer-events: ${props => props.editMode && 'none'};
	opacity: ${props => props.editMode && '0.4'};

	${media.mediumDown`
		height: 2rem;
	`}

	img,
	video {
		height: 100%;
	}
`;

export const Title = styled.h2`
	pointer-events: ${props => props.editMode && 'none'};
`;

export default function TopHeaderComponent(props: Props) {
	const { header, className } = props;
	const { block } = React.useContext(StandardBlockContext);
	const url = header.customHeaderLink ? header.customHeaderLink.url : null;
	const urlText = header.customHeaderLink ? header.customHeaderLink.text : null;
	const { editMode } = React.useContext(EditorContext);
	const TitleLink = url ? HeaderLink : React.Fragment;
	const LogoLink = url ? Link : React.Fragment;

	return (
		<Header className={className} unbranded={block.unbranded} editMode={editMode}>
			{header.logo ? (
				<LogoContainer>
					<LogoLink {...(url ? { href: url } : null)}>
						<ResponsiveImage id={header.logo.id} format={header.logo.format} transform="BlogLogo" noLazy />
					</LogoLink>
				</LogoContainer>
			) : (
				<h2>
					<TitleLink {...(url ? { href: url } : null)}>{header.title}</TitleLink>
				</h2>
			)}

			{url && urlText && <ShowAllLink href={url}>
				<ShortLinkText>Show all</ShortLinkText>
				<LongLinkText>{urlText}</LongLinkText>
			</ShowAllLink>}
		</Header>
	);
}
