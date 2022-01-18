// @Flow

import React from 'react';
import styled from 'styled-components';
import { Info } from 'luxon';

const MonthContainer = styled.h3`
	margin-bottom: 1px;
	margin-left: 20px;
`;

const months = Info.months('long').map(m => m.toLowerCase());

const SitemapMonths = props => {
	if (props.indexYear === props.startYear) {
		return months.map((month, index) => {
			if (index + 1 >= props.startMonth) {
				return (
					<MonthContainer key={month}>
						<a
							href={`/sitemap/${
								props.indexYear
							}/${month}`}
						>
							{month}
						</a>
					</MonthContainer>
				);
			}
		});
	} else if (props.indexYear === props.currentYear) {
		return months.map((month, index) => {
			if (index + 1 <= props.currentMonth) {
				return (
					<MonthContainer key={month}>
						<a
							href={`/sitemap/${
								props.indexYear
							}/${month}`}
						>
							{month}
						</a>
					</MonthContainer>
				);
			}
		});
	} else {
		return months.map(month => {
			return (
				<MonthContainer key={month}>
					<a
						href={`/sitemap/${
							props.indexYear
						}/${month}`}
					>
						{month}
					</a>
				</MonthContainer>
			);
		});
	}
};

export default SitemapMonths;
