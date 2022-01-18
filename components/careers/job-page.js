// @flow

import * as React from 'react';
import styled from 'styled-components';
import he from 'he';

import { FontFaces } from 'kinja-components/components/theme/fonts';
import { colors } from 'kinja-components/components/theme/themes';
import FacebookIcon from 'kinja-components/components/icon19/Facebook';
import LinkedinIcon from 'kinja-components/components/icon19/Linkedin';
import TwitterIcon from 'kinja-components/components/icon19/Twitter';
import MailIcon from 'kinja-components/components/icon19/Mail';
import type { SingleJob, Location } from 'kinja-magma/models/Greenhouse';

import { Header, Footer, Section, SectionContent } from './common';
import { LogoList } from './logo-list';

const UnstyledShare = ({
	job,
	className
}: {
	job: SingleJob,
	className?: string
}): React.Node => {
	const url = `https://gizmodo.com/careers/job/${job.id}?gh_jid=${job.id}`;
	const sharetext = `${job.title} - ${job.location.name} - G/O Media Careers`;

	const windowOpen = (url: string, name: string, width: number, height: number) =>
		`javascript:window.open('${url}', '${name}', 'toolbar=0,status=0,width=${width},height=${height}');`;

	const facebookUrl = windowOpen(`https://www.facebook.com/sharer.php?u=${encodeURI(url)}`, 'sharefacebook', 480, 360);
	const linkedinUrl = windowOpen(`https://www.linkedin.com/cws/share?url=${encodeURI(url)}`, 'sharelinkedin', 480, 680);
	const twitterUrl = windowOpen(`https://twitter.com/share?url=${encodeURI(url)}&text=${encodeURI(sharetext)}`, 'sharetwitter', 480, 360);
	const mailUrl = `mailto:?subject=${encodeURI(sharetext)}&body=${encodeURI(url)}`;

	return (
		<ul className={className}>
			<li>
				<a href={facebookUrl} title="Share through Facebook">
					<FacebookIcon/>
				</a>
			</li>
			<li>
				<a href={linkedinUrl} title="Share through LinkedIn">
					<LinkedinIcon/>
				</a>
			</li>
			<li>
				<a href={twitterUrl} title="Share through Twitter">
					<TwitterIcon/>
				</a>
			</li>
			<li>
				<a href={mailUrl} target="_blank" rel="noopener noreferrer" title="Email job opening">
					<MailIcon/>
				</a>
			</li>
		</ul>
	);
};

const Share = styled(UnstyledShare)`
	list-style-type: none;
	text-align: ${props => props.align || 'center'};
	margin: 0 0 2.25rem;
	padding: 0 0 0 10px;

	& li {
		display: inline-block;
		padding: 0 10px 0 0;
	}

	& a {
		display: inline-block;
		text-align: center;
		padding: 0;
		width: 34px;
		height: 34px;
		border-radius: 34px;
		line-height: 34px;
		font-size: 14px;
		border: solid 1px ${colors.gray};
	}

	& svg {
		margin: 7px auto;
		width: 18px;
		height: 18px;
	}
`;

const UnstyledHome = ({
	location,
	className
}: {
	location: Location,
	className?: string
}): React.Node => {
	const href = `/careers/${location.name === 'Budapest' ? 'budapest' : 'newyork'}#openings`;
	return (
		<nav className={className}>
			<a href={href}>See all job openings</a>
		</nav>
	);
};

const Home = styled(UnstyledHome)`
	text-align: center;
	margin: 0 0 2.25rem;
`;

const Content = styled.div`
	border-bottom: 1px solid ${colors.lightgray};

	p,
	div,
	ul {
		font-size: 1.125rem;
		line-height: 1.5;
	}

	ul {
		list-style-type: disc;
	}
`;

export const JobPage = ({job}: {job: SingleJob}): React.Node =>
	<React.Fragment>
		<FontFaces/>

		<Header>
			<LogoList />
		</Header>

		<Section>
			<SectionContent style={{marginTop: '4.5rem'}}>
				<h1>{job.title}</h1>
				<h2>{job.location.name}</h2>
				<Share job={job} align={'center'} />
				<Home location={job.location} />
				<Content>
					<div dangerouslySetInnerHTML={{__html: he.decode(job.content)}}/>
					<h4>Know someone perfect for this job? Share away!</h4>
					<Share job={job} align={'left'} />
				</Content>
			</SectionContent>
		</Section>

		<Section>
			<SectionContent>
				<div id="grnhse_app" className="content--greenhouse"></div>
				<script src="https://boards.greenhouse.io/embed/job_board/js?for=gizmodomedia"></script>
				<Home location={job.location} />
			</SectionContent>
		</Section>

		<Footer>
			<LogoList />
		</Footer>
	</React.Fragment>;
