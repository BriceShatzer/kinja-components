// @flow

import * as React from 'react';
import styled from 'styled-components';
import Button from '../button19';
import ArrowLeftIcon from '../icon19/ArrowLeft';
import ArrowRightIcon from '../icon19/ArrowRight';

type Props = {
  currentPage: number,
  onPrevClick: () => void,
  onNextClick: () => void
};

const Container = styled.div`
	width: 100%;
	max-width: 430px;
	margin: 30px auto 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Label = styled.div`
	margin-left: 12px;
	margin-right: 12px;
`;

export default function VideoAdminPagination(props: Props) {
	return (
		<Container>
			<Button
				label="Previous page"
				labelPosition="after"
				icon={<ArrowLeftIcon />}
				onClick={props.onPrevClick}
				disabled={props.currentPage === 1}
			/>
			<Label>{`Page ${props.currentPage}`}</Label>
			<Button
				label="Next page"
				icon={<ArrowRightIcon />}
				onClick={props.onNextClick}
			/>
		</Container>
	);
}