// @flow

import styled from 'styled-components';
import * as React from 'react';
import NetworkTile from './network-tile/network-tile';
import { linkTypes } from '../footer/subcomponents/footerLinks';
import { NETWORK_BLOGS } from '../../config/consts';
import BlogLogo, { LogoWrapper } from '../blog-logo';
import { gridValue } from '../grid-utils';
import media from '../../style-utils/media';
import Theme from '../theme';

const blogs = [
	NETWORK_BLOGS.filter(blog => !blog.isSatire && !blog.isCommerce).sort((a, b) => a.name.replace('the', '') < b.name.replace('the', '') ? -1 : 1),
	NETWORK_BLOGS.filter(blog => blog.isSatire).sort((a, b) => a.name.replace('the', '') < b.name.replace('the', '') ? -1 : 1),
	NETWORK_BLOGS.filter(blog => blog.name === 'theinventory')
];

const FullWidthContainer = styled.div`
	width: 100%;
	display: block;
	background: ${props => props.theme.color.black};
	text-align: center;
`;

const Container = styled.div`
	display: inline-flex;
	flex-wrap: wrap;
	${media.mediumDown`
		width: ${gridValue.small('6c')};
	`}

	${media.largeOnly`
		width: ${gridValue.large('8c')};
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('12c')};
	`}

	${media.xxlargeUp`
		width: ${gridValue.xxlarge('12c')};
	`}
`;

const BlogBucket = styled.div`
	display: grid;
	flex-wrap: wrap;
	width: fit-content;
	border-top: 1px solid ${props => props.theme.color.darkgray};

	${media.smallOnly`
		grid-template-columns: repeat(2, ${gridValue.small('3c')});
		grid-column-gap: ${gridValue.small('1g')};
		grid-row-gap: ${gridValue.small('1g')};
		padding: ${gridValue.small('1g')} 0;
	`}

	${media.mediumOnly`
		grid-template-columns: repeat(3, ${gridValue.medium('2c')});
		grid-column-gap: ${gridValue.medium('1g')};
		grid-row-gap: ${gridValue.medium('1g')};
		padding: ${gridValue.medium('1g')} 0;
	`}

	${media.largeOnly`
		grid-template-columns: repeat(4, ${gridValue.large('2c')});
		grid-column-gap: ${gridValue.large('1g')};
		grid-row-gap: ${gridValue.large('1g')};
		padding: ${gridValue.large('1g')} 0;
	`}

	${media.xlargeOnly`
		grid-template-columns: repeat(6, ${gridValue.xlarge('2c')});
		grid-column-gap: ${gridValue.xlarge('1g')};
		grid-row-gap: ${gridValue.xlarge('1g')};
		padding: ${gridValue.xlarge('1g')} 0;
	`}

	${media.xxlargeUp`
		grid-template-columns: repeat(6, ${gridValue.xxlarge('2c')});
		grid-column-gap: ${gridValue.xxlarge('1g')};
		grid-row-gap: ${gridValue.xxlarge('1g')};
		padding: ${gridValue.xxlarge('1g')} 0;
	`}
`;

const Title = styled.div`
	color: ${props => props.theme.color.white};
	display: flex;
	margin-top: 40px;
	margin-bottom: 16px;

	span {
		text-align: left;
		text-transform: uppercase;
		font-size: 16px;
		font-weight: bold;
		letter-spacing: 1.13px;
	}

	${LogoWrapper} {
		margin-right: 16px;
	}

	${media.mediumDown`
		margin-top: 24px;
		margin-bottom: 8px;
		flex-direction: column;
		align-items: flex-start;

		span {
			font-size: 14px;
		}

		${LogoWrapper} {
			margin-bottom: 8px;
		}
	`}

	${media.xlargeOnly`
		margin-top: 32px;

		${LogoWrapper} {
			--scale: 0.42;
			margin-top: 3px;
		}
	`}

	${media.smallOnly`
		${LogoWrapper} {
			--scale: 0.42;
		}
	`}
`;

const Footer = styled.footer`
	${media.mediumDown`
		margin-bottom: 24px;
	`}

	${media.largeUp`
		margin-top: 8px;
		margin-bottom: 40px;
	`}

	a {
		color: ${props => props.theme.color.white};
		font-size: 14px;
		line-height: 17px;
		margin-right: 16px;
	}
`;

const CopyrightText = styled.span`
	color: ${props => props.theme.color.gray};
`;

const links = [linkTypes.Help, linkTypes.ContentGuidelines, linkTypes.Advertising, linkTypes.Privacy, linkTypes.Jobs, linkTypes.TermsOfUse];

export default function NetworkNav(props: { isScrollback?: boolean }) {
	const currentYear = (new Date()).getFullYear();
	const copyrightText = `© ${currentYear} G/O Media`;
	return (
		<FullWidthContainer>
			<Container>
				<Title><BlogLogo name="gomedia" scale={0.58} monochrome /><span>Explore our other sites</span></Title>
				{blogs.map(blogBucket => (
					<BlogBucket key={blogBucket.map(blog => blog.name).join('-')}>
						{blogBucket.map(blog => (
							<Theme key={blog.name} blog={blog.name}>
								<NetworkTile
									blogName={blog.name}
									tagline={blog.tagline || undefined}
									url={blog.url}
									isScrollback={props.isScrollback}
								/>
							</Theme>
						))}
					</BlogBucket>
				))}
				<Footer>
					{links.map(link => (
						<a href={link.url} key={link.url}>{link.text}</a>
					))}
					<CopyrightText>{copyrightText}</CopyrightText>
				</Footer>
			</Container>
		</FullWidthContainer>
	);
}
