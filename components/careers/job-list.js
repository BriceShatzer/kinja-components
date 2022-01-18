// @flow

import * as React from 'react';
import styled from 'styled-components';

import { colors } from 'kinja-components/components/theme/themes';
import media from 'kinja-components/style-utils/media';
import type { Office, Department, Job } from 'kinja-magma/models/Greenhouse';

const JobTitle = styled.span`
	font-weight: bold;
	color: ${colors.darksmoke};
`;

const JobLocation = styled.span`
	color: ${colors.gray};
`;

const JobView = styled.span`
	float: right;

	${media.smallOnly`
		float: none;
		display: block;
	`}
`;

const JobLink = styled.a`
	display: block;
	padding: 15px 0;
`;

const JobListItem = styled.li`
	border-bottom: 1px solid ${colors.lightgray};
	padding: 0;
	font-size: 16px;
`;

const JobItem = ({job}: {job: Job}): React.Node =>
	<JobListItem>
		<JobLink href={`/careers/job/${job.id}?gh_jid=${job.id}`}>
			<JobTitle>{job.title}</JobTitle> <JobLocation>&middot; {job.location.name}</JobLocation> <JobView>View opening</JobView>
		</JobLink>
	</JobListItem>;

const UnstyledDepartmentJobList = ({
	department,
	className
}: {
	department: Department,
	className?: string
}): React.Node => {
	const jobCount = department.jobs.length;
	if (!jobCount) {
		return null;
	}
	return (
		<div className={className}>
			<h4>{`${department.name} (${jobCount} ${jobCount > 1 ? 'openings' : 'opening'})`}</h4>
			<ul>
				{department.jobs.map(job => <JobItem job={job} key={job.id} />)}
			</ul>
		</div>
	);
};

const DepartmentJobList = styled(UnstyledDepartmentJobList)`
	ul {
		margin: 0 0 70px;
		border-top: 1px solid ${colors.lightgray};
		list-style-type: none;
	}
`;

const EmptyMessage = styled.div`
	text-align: center;
	font-size: 2rem;
	line-height: 2rem;
	margin: 3rem 0 4rem;
`;

export const JobList = ({office}: {office: Office}): React.Node => {
	const totalCount = office.departments.reduce((total, dep) => total + dep.jobs.length, 0);
	if (!totalCount) {
		return (
			<EmptyMessage>There are currently no openings in {office.name}</EmptyMessage>
		);
	}
	return (
		<React.Fragment>
			{office.departments.map(dep => <DepartmentJobList department={dep} key={dep.id} />)}
		</React.Fragment>
	);
};
