// @flow

import React from 'react';
import styled from 'styled-components';
import SitemapMonths from './sitemap-months';

const PageContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100vw;
`;

const YearContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
	margin: 20px 15px;
`;

const YearHeader = styled.h2``;

type SitemapYearProps = {|
	startYear: number,
	startMonth: number
|};

const SitemapYear = ({
	startYear,
	startMonth
}: SitemapYearProps) => {
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;

	const generateYearContainers = () => {
		const years = [];

		for (let i = currentYear; i >= startYear; i--) {
			years.push(
				<YearContainer key={i}>
					<YearHeader>
						{i}
					</YearHeader>
					<SitemapMonths
						indexYear={i}
						startYear={startYear}
						startMonth={startMonth}
						currentYear={currentYear}
						currentMonth={currentMonth}
					/>
				</YearContainer>
			);
		}

		return years;
	};

	return (
		<PageContainer>
			{generateYearContainers()}
		</PageContainer>
	);
};

export default SitemapYear;
