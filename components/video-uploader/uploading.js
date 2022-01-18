// @flow
import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { EnsureDefaultTheme } from '../theme';

type Props = {
	finished?: boolean,
	errored?: boolean,
	message?: string,
	stateTransition?: boolean
};

const Container = styled.div`
	text-align: center;
`;

const Cloud = styled.path.attrs({
	// eslint-disable-next-line max-len
	d: 'M74.937 24.03l-.938-.06.001-.94V23c0-12.15-9.85-22-22-22a21.992 21.992 0 0 0-19.367 11.555l-.527.975-.916-.625A10.943 10.943 0 0 0 25 11c-6.075 0-11 4.925-11 11 0 .394.02.784.062 1.171l.096.915-.903.173C6.203 25.606 1 31.99 1 39.5 1 48.067 7.723 55 16 55h58c8.277 0 15-6.933 15-15.5 0-8.207-6.188-14.97-14.063-15.47z'
})`
	fill: none;
	color: ${props => props.theme.color.darksmoke};
	stroke-width: 2px;
	
	${props => props.stateTransition && css`
		transition: stroke 0.5s 0.5s;
	`}
	
	${props => props.finished && css`
		stroke: #23891f;
		${props => props.stateTransition && css`
			transition-delay: 3.5s;
		`}
	`}

	${props => props.errored && css`
		stroke: #ef7740;
		transition-delay: ${props => props.stateTransition ? '1s' : '0s'};
	`}
`;

const CheckmarkWrapper = styled.g`
	stroke: ${props => props.theme.color.success};
	stroke-width: 2px;
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-dasharray: 33;
	stroke-dashoffset: ${props => props.finished && !props.errored ? '0' : '33'};
	transform: translate(34px, 25px);
	fill: none;
	
	${props => props.stateTransition && css`
		transition: stroke-dashoffset 0.5s;
		transition-delay: ${props => props.finished ? '3.5s' : '0.5s'};
	`}
`;

const Checkmark = props => (
	<CheckmarkWrapper {...props}>
		<polyline points="0 10 6 16 22 0" />
	</CheckmarkWrapper>
);

const Crossmark = styled.path.attrs({
	d: 'M1.5 1.5l15 15m0-15l-15 15'
})`
	stroke-width: 2px;
	stroke-linecap: round;
	stroke-linejoin: round;
	transform: translate(36px, 25px);
	stroke: ${props => props.theme.color.error};
	stroke-dasharray: 33;
	stroke-dashoffset: ${props => props.errored ? '0' : '33'};

	${props => props.stateTransition && css`
		transition: stroke-dashoffset 0.5s;
		transition-delay: ${props => props.errored ? '1s' : '0'};
	`}
`;

const Mask = styled.g`
	transform: translate(31px, 47px);
`;

const roll = keyframes`
	100% {
		transform: translateY(-12px);
	}
`;

const rollOut = keyframes`
	100% {
		transform: translateY(-74px);
	}
`;

const Frames = styled.g`
	animation: ${roll} 0.5s linear infinite;
	opacity: 1;

	${props => props.finished && css`
		animation: ${rollOut} ${props => props.stateTransition ? '3.5s' : '0s'} linear 1;
		animation-fill-mode: forwards;
	`}

	${props => props.errored && css`
		animation: ${rollOut} ${props => props.stateTransition ? '3.5s' : '0s'} linear 1;
		animation-fill-mode: forwards;
		opacity: 0;
		transition: opacity 0.5s 1s;
	`}
`;

const FrameWrapper = styled.g`
	transform: translateY(${props => props.offset * 12}px);
	fill: #fff;
`;

const Frame = ({ offset }: { offset: number }) => (
	<FrameWrapper offset={offset}>
		<rect x="0" y="0" width="28" height="14" fill="#333" />
		<rect x="2" y="2" width="2" height="2" rx=".5" />
		<rect x="2" y="6" width="2" height="2" rx=".5" />
		<rect x="2" y="10" width="2" height="2" rx=".5" />
		<rect x="6" y="2" width="16" height="10" rx="2" />
		<rect x="24" y="2" width="2" height="2" rx=".5" />
		<rect x="24" y="6" width="2" height="2" rx=".5" />
		<rect x="24" y="10" width="2" height="2" rx=".5" />
	</FrameWrapper>
);

const Film = props => (
	<Mask mask="url(#video-upload-mask)">
		<Frames {...props}>
			<Frame offset={0} />
			<Frame offset={1} />
			<Frame offset={2} />
			<Frame offset={3} />
			<Frame offset={4} />
			<Frame offset={5} />
		</Frames>
	</Mask>
);

const Slit = styled.line.attrs({
	x1: '27',
	x2: '63',
	y1: '46',
	y2: '46'
})`
	stroke: #aaa;
	stroke-width: 2px;
	stroke-linecap: round;
	opacity: 1;
	${props => props.stateTransition && css`
		transition: opacity 0.5s 0.5s;
	`}
	
	${props => props.finished && css`
		opacity: 0;
		${props => props.stateTransition && css`
			transition-delay: 3.5s;
		`}
	`}

	${props => props.errored && css`
		opacity: 0;
		${props => props.stateTransition && css`
			transition-delay: 1s;
		`}
	`}
`;

const Message = styled.div`
	font-family: ${props => props.theme.typography.primary.fontFamily};
	color: ${props => props.theme.color.black};
	white-space: pre-wrap;
	margin-bottom: 15px;
`;

const UploadingAnimation = ({
	finished = false,
	errored = false,
	message,
	stateTransition = true
}: Props) => (
	<EnsureDefaultTheme>
		<Container>
			<svg width="90" height="101" viewBox="0 0 90 101">
				<defs>
					<linearGradient x1="50%" y1="85%" x2="50%" y2="100%" id="video-upload-linear-gradient">
						<stop stopColor="#fff" offset="0%"/>
						<stop stopOpacity="0" offset="100%"/>
					</linearGradient>
					<mask id="video-upload-mask">
						<rect fill="url(#video-upload-linear-gradient)" x="0" y="0" width="28" height="54" />
					</mask>
				</defs>
				<Cloud finished={finished} errored={errored} stateTransition={stateTransition} />
				<Checkmark finished={finished} errored={errored} stateTransition={stateTransition} />
				<Crossmark errored={errored} stateTransition={stateTransition} />
				<Film finished={finished} errored={errored} stateTransition={stateTransition} />
				<Slit finished={finished} errored={errored} stateTransition={stateTransition} />
			</svg>
			{message &&
				<Message>{message}</Message>
			}
		</Container>
	</EnsureDefaultTheme>
);

export default UploadingAnimation;
