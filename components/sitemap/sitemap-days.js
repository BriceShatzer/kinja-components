// @flow

import React from 'react';
import styled from 'styled-components';
import { Info } from 'luxon';

const DatesContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	@media (min-width: 768px) {
		width: 50%;
	}
`;

const NumberContainer = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 100px;
	font-size: 1.5rem;
`;

type SitemapDaysProps = {
	year: number,
	month: number, // 1-12
	days: Array<{ total: number, day: number }>
};
const SitemapDays = ({ month, year, days }: SitemapDaysProps) => {
	const monthAsString = Info.months('long')[month - 1];
	const monthAsUrlParam = monthAsString.toLowerCase();

	return (
		<React.Fragment>
			<h2>{`${monthAsString} ${year}`}</h2>
			<DatesContainer>{days.map(p => (
				<NumberContainer
					as={p.total === 0 ? 'span' : undefined}
					href={p.total === 0 ? undefined : `/sitemap/${year}/${monthAsUrlParam}/${p.day}`}
					key={p.day}>
					{p.day}
				</NumberContainer>
			))}</DatesContainer>
		</React.Fragment>
	);
};

export default SitemapDays;
