/* @flow */

import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../buttons';
import UploadingAnimation from './uploading';
import { EnsureDefaultTheme } from '../theme';

// ICONS
import RotateIcon from '../icon19/Rotate';
import WriteIcon from '../icon19/Write';

type ProgressProps = {
	onCancelClick?: () => void,
	onEditClick?: () => void,
	onRetryClick?: () => void,
	isFinished: boolean,
	isUploaded: boolean,
	isErrored: boolean,
	stateTransition?: boolean,
	message: string,
	percent: number
};

const Container = styled.div`
	max-width: 400px;
	text-align: center;
`;

const CancelButton = styled(Button)`
	margin-right: 15px;
`;

const SVG = styled.svg.attrs({
	preserveAspectRatio: 'none',
	viewBox: '0 0 100 4'
})`
	margin-bottom: 10px;
	width: 100%;
	height: 4px;
	${props => props.full && css`
		visibility: hidden;
	`}
`;

const Trail = styled.line.attrs({
	x1: 0,
	y1: 2,
	x2: 100,
	y2: 2
})`
	stroke: #d8d8d8;
	stroke-width: 4px;
`;

const Bar = styled(Trail)`
	stroke: #0093ec;
	transform: scaleX(${props => props.percent / 100});
	transition: transform 1s ease;
`;

const ProgressBar = ({ percent }: { percent: number }) =>
	<SVG full={percent >= 100}>
		<Trail />
		<Bar percent={percent} />
	</SVG>;

const Buttons = ({ onCancelClick, onEditClick }: {
	onCancelClick?: () => void,
	onEditClick?: () => void,
}) => (
	<React.Fragment>
		<CancelButton key="cancel"
			onClick={onCancelClick}
			label="Cancel upload"
			weight="tertiary"
			small
		/>
		<Button key="edit"
			onClick={onEditClick}
			label="Edit video info"
			labelPosition="after"
			weight="tertiary"
			icon={<WriteIcon />}
			small
		/>
	</React.Fragment>
);

const RetryButton = ({ onClick }: {
	onClick?: () => void
}) => (
	<Button
		onClick={onClick}
		label="Retry"
		labelPosition="after"
		weight="tertiary"
		icon={<RotateIcon />}
		small />
);

const ProgressIndicator = (props: ProgressProps) => {
	const {
		onCancelClick,
		onEditClick,
		onRetryClick,
		message,
		isUploaded,
		isFinished,
		isErrored,
		stateTransition = true,
		percent = 0
	} = props;

	return (
		<EnsureDefaultTheme>
			<Container>
				<UploadingAnimation
					finished={isUploaded}
					errored={isErrored}
					stateTransition={stateTransition}
					message={message}
				/>
				{!isErrored && <ProgressBar percent={percent} />}
				{!isFinished && !isErrored && <Buttons onCancelClick={onCancelClick} onEditClick={onEditClick} />}
				{!isFinished && isErrored && <RetryButton onClick={onRetryClick} />}
			</Container>
		</EnsureDefaultTheme>
	);
};

export default ProgressIndicator;
