// @flow

import * as React from 'react';
import styled from 'styled-components';

import { FontFaces } from 'kinja-components/components/theme/fonts';
import Button19 from '../button19';
import { colors } from 'kinja-components/components/theme/themes';
import media from 'kinja-components/style-utils/media';
import { IconWrapper } from 'kinja-components/components/icon19/icon19';
import KeyIcon from 'kinja-components/components/icon19/Key';
import HeartIcon from 'kinja-components/components/icon19/Heart';
import BubbleAddIcon from 'kinja-components/components/icon19/BubbleAdd';
import WriteIcon from 'kinja-components/components/icon19/Write';
import type { Office } from 'kinja-magma/models/Greenhouse';

import { Header, Footer, Section, SectionContent, Underline } from './common';
import { LogoList } from './logo-list';
import { JobList } from './job-list';
import { TopHeroSection } from './top-hero-section';

const Intro = styled.p`
	font-size: 1.312rem;
	line-height: 1.45;
	text-align: center;
	margin-bottom: 2.25rem;
`;

const Highlight = styled.div`
	padding: 5px 10px;
	background-color: ${props => props.highlightColor || 'transparent'};
`;

const TileContent = styled.div`
	text-align: center;
	padding: 30px;
	background: ${props => props.background};
	background-size: cover;
	background-repeat: no-repeat;
	color: ${props => props.textColor || colors.black};

	h1,
	h2,
	h3,
	p {
		color: ${props => props.textColor || colors.black};
		margin: 0;
	}

	h1 {
		font-size: 2rem;

		${media.xlargeUp`
			font-size: 3.438rem;
		`}
		${media.smallOnly`
			font-size: 3.438rem;
		`}
	}

	h2 {
		font-size: 1.75rem;

		${media.xlargeUp`
			font-size: 2.5rem;
		`}
		${media.smallOnly`
			font-size: 2.5rem;
		`}
	}

	h3 {
		font-size: 1.125rem;

		${media.xlargeUp`
			font-size: 1.312rem;
		`}
		${media.smallOnly`
			font-size: 1.312rem;
		`}
	}

	p {
		margin-top: 1rem;
		font-size: 1.125rem;
		line-height: 1.25;
		color: ${colors.gray};
	}

	${IconWrapper} {
		fill: ${colors.midgray};
		display: inline-block;
	}

	${IconWrapper} svg {
		width: 30px;
		height: 30px;
		margin: 10px 0;
	}
`;

const UnstyledTile = ({
	className,
	background,
	textColor,
	children
}: {
	className: string,
	background?: string,
	textColor?: string,
	children: React.Node
}): React.Node =>
	<div className={className}>
		<TileContent background={background} textColor={textColor}>
			{children}
		</TileContent>
	</div>;

const TileSquare = styled(UnstyledTile)`
	padding: 0 1.125rem 2.25rem 1.125rem;
	float: left;

	width: 100%;

	${TileContent} {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vw;
	}

	${media.mediumUp`
		width: 33.333vw;

		${TileContent} {
			height: 31vw;
		}
	`}
`;

const TileInfo = styled(UnstyledTile)`
	margin: 0 1.125rem 2.25rem 1.125rem;
	background: ${props => props.background};
`;
const FlexWrap = styled.div`
	${media.mediumUp`
		display: flex;
	`}

	${media.largeUp`
		width: 50%;
	`}

	${TileInfo} {
		${media.mediumUp`
			width: 50%;
		`}
	}
`;

export const BudapestCareersPage = ({office}: {office: Office}): React.Node =>
	<React.Fragment>
		<FontFaces/>

		<Header>
			<LogoList />
		</Header>

		<TopHeroSection>
			<h1>Join G/O Media</h1>
			<Button19
				tag='a'
				href='#openings'
				rel='noopener noreferrer'
				label='See all Budapest openings'
				variant='primary'
			/>
			<br/>
			<Button19
				tag='a'
				href='/careers#openings'
				rel='noopener noreferrer'
				label='See all U.S. openings'
				variant='primary'
			/>
		</TopHeroSection>

		<Section>
			<SectionContent>
				<Intro>
					G/O Media is the publisher of some of the best loved titles on the web. Founded
					in 2002 and reorganized under G/O Media earlier this year, we value honest
					conversations and independent journalism. We are an influential media group with
					a collective audience of 100 million US readers. Join our team of passionate
					individuals from our offices in the U.S. and Budapest.
				</Intro>
			</SectionContent>
		</Section>

		<Section wide={true}>
			<TileSquare
				background="url('//x.kinja-static.com/assets/images/jobs/monthlyreaders.jpg') 113% center"
				textColor={colors.primary}>
				<Highlight highlightColor={colors.white}>
					<h1>100,000,000</h1>
					<h3>MONTHLY READERS</h3>
				</Highlight>
			</TileSquare>
			<TileSquare
				background="url('//x.kinja-static.com/assets/images/jobs/fbfans.jpg') center center"
				textColor={colors.white}>
				<Highlight>
					<h1>7,000,000</h1>
					<h3>FACEBOOK FANS</h3>
				</Highlight>
			</TileSquare>
			<TileSquare
				background="url('//x.kinja-static.com/assets/images/jobs/twfollowers.jpg') center center"
				textColor={colors.white}>
				<Highlight>
					<h1>7,700,000</h1>
					<h3>TWITTER FOLLOWERS</h3>
				</Highlight>
			</TileSquare>
		</Section>

		<TopHeroSection>
			<h1>We proudly offer robust benefits for our full-time employees</h1>
		</TopHeroSection>

		<Section wide={true}>
			<FlexWrap>
				<TileInfo
					background={colors.whitesmoke}
					textColor={colors.black}>
					<KeyIcon />
					<h3>Central Budapest Office</h3>
					<p>
						We’re at Andrássy 66–a short walk from Oktogon. The office has bike lockers,
						changing rooms, personal lockers, and showers. Enjoy unlimited coffee/drinks,
						as well as weekly breakfast/lunch.
					</p>
				</TileInfo>
				<TileInfo
					background={colors.whitesmoke}
					textColor={colors.black}>
					<HeartIcon />
					<h3>Stay Healthy</h3>
					<p>
						We provide fruit and vegetable snacks, along with freshly squeezed juice twice
						a week. You can exercise and relax at the numerous facilities that accept
						the <a href="https://allyoucanmove.hu/" target="_blank" rel="noopener noreferrer">AYCM</a> card
						we provide.
					</p>
				</TileInfo>
			</FlexWrap>
			<FlexWrap>
				<TileInfo
					background={colors.whitesmoke}
					textColor={colors.black}>
					<BubbleAddIcon />
					<h3>Mobile Phone Perks</h3>
					<p>
						Use your company subscription for both private and business calls. You’ll
						get a plan with unlimited domestic and EU calls, texts, and 12GB of data
						every month–all for free.
					</p>
				</TileInfo>
				<TileInfo
					background={colors.whitesmoke}
					textColor={colors.black}>
					<WriteIcon />
					<h3>Conferences and Classes</h3>
					<p>
						We have a yearly budget for career related conferences and classes for tech
						team members interested in furthering education and skills.
					</p>
				</TileInfo>
			</FlexWrap>
		</Section>

		<Section wide={true}>
			<TileSquare
				background="url('//x.kinja-static.com/assets/images/jobs/budlunch.jpg') center center"
				textColor={colors.white}>
				<h2>WEEKLY LUNCH AND BREAKFAST</h2>
			</TileSquare>
			<TileSquare
				background="url('//x.kinja-static.com/assets/images/jobs/budevent.jpg') 34% center"
				textColor={colors.white}>
				<h2>AWESOME EVENTS</h2>
			</TileSquare>
			<TileSquare
				background="url('//x.kinja-static.com/assets/images/jobs/funbuda.jpg') center 19%"
				textColor={colors.white}>
				<h2>FUN PEOPLE</h2>
			</TileSquare>
		</Section>

		<TopHeroSection background="url('//x.kinja-static.com/assets/images/jobs/budabg.jpg') center 20%" id="openings">
			<h1>Current Budapest Job Openings</h1>
			<a href="/careers#openings">See our U.S. openings <Underline>here</Underline>.</a>
		</TopHeroSection>

		<Section>
			<SectionContent>
				<JobList office={office} />
			</SectionContent>
		</Section>

		<Footer>
			<LogoList />
		</Footer>
	</React.Fragment>;
