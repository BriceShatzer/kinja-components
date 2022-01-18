// @flow

import * as React from 'react';

import { FontFaces } from '../theme/fonts';
import Button19 from '../button19';
import type { Office } from 'kinja-magma/models/Greenhouse';

import { Header, Footer, Section, SectionContent, Underline } from './common';
import { LogoList } from './logo-list';
import { JobList } from './job-list';
import { TopHeroSection } from './top-hero-section';

export const NewYorkCareersPage = ({office}: {office: Office}): React.Node =>
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
				label='See all U.S. openings'
				variant='primary'
			/>
			<br/>
			<Button19
				tag='a'
				href='/careers/budapest#openings'
				rel='noopener noreferrer'
				label='See all Budapest, Hungary openings'
				variant='primary'
			/>
		</TopHeroSection>

		<TopHeroSection background="url('//x.kinja-static.com/assets/images/jobs/currentjobs.jpg') center 21%" id="openings">
			<h1>Current U.S. Job Openings</h1>
			<a href="/careers/budapest#openings">See our Budapest openings <Underline>here</Underline>.</a>
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
