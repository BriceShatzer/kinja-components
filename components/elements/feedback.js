// @flow //
import * as React from 'react';
import styled, { css } from 'styled-components';
import Error from 'kinja-components/components/icon19/Error';
import Checkmark from 'kinja-components/components/icon19/Checkmark';

type Props = {
	text: string,
	className?: string,
	color?: 'error' | 'alert' | 'success' | 'default',
	arrow?: 'topleft' | 'topcenter' | 'topright' | 'bottomleft' | 'bottomcenter' | 'bottomright',
	shadow?: boolean
};

const backgroundColor = (props): string => {
	const { color } = props;

	switch (color) {
		case 'error':
			return props.theme.color.error;
		case 'alert':
			return props.theme.color.alert;
		case 'success':
			return props.theme.color.success;
		default:
			return props.theme.color.whitesmoke;
	}
};

const textColor = (props): string => {
	const { color } = props;

	if (color === 'default' || color === 'alert') {
		return props.theme.color.darksmoke;
	}

	return props.theme.color.white;
};

const FeedbackContainer = styled.div`
	background-color: ${backgroundColor};
	border-radius: 3px;
	color: ${props => textColor(props)};
	display: flex;
	flex-direction: row;
	padding: 0.1875rem 0.5rem 0.1875rem 0.25rem;
	position: relative;
	width: fit-content;

	${props => props.color === 'default' && css`
		border: 1px solid ${props => props.theme.color.midgray};
	`}

	${props => props.arrow && css`

		:before {
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			content: " ";
			height: 0;
			position: absolute;
			width: 0;
		}
	`}

	${props => props.arrow === 'topleft' && css`

		:before {
			border-bottom: 5px solid ${backgroundColor};
			left: 8px;
			top: -5px;
		}
	`}

	${props => props.arrow === 'topcenter' && css`

		:before {
			border-bottom: 5px solid ${backgroundColor};
			left: calc(50% - 5px);
			top: -5px;
		}
	`}

	${props => props.arrow === 'topright' && css`

		:before {
			border-bottom: 5px solid ${backgroundColor};
			right: 8px;
			top: -5px;
		}
	`}

	${props => props.arrow === 'bottomleft' && css`

		:before {
			border-top: 5px solid ${backgroundColor};
			left: 8px;
			bottom: -5px;
		}
	`}

	${props => props.arrow === 'bottomcenter' && css`

		:before {
			border-top: 5px solid ${backgroundColor};
			left: calc(50% - 5px);
			bottom: -5px;
		}
	`}

	${props => props.arrow === 'bottomright' && css`

		:before {
			border-top: 5px solid ${backgroundColor};
			right: 8px;
			bottom: -5px;
		}
	`}

	${props => props.shadow && css`
		box-shadow: rgba(0, 0, 0, 0.07) 0px 0px 10px;
	`}
`;

function FeedbackIcon({ color }) {
	switch (color) {
		case 'success':
			return <Checkmark />;
		case 'default':
			return null;
		default:
			return <Error />;
	}
}

export const FeedbackText = styled.p`
	font-size: 0.875rem;
	line-height: 1.125rem;
	margin-bottom: 0;
	margin-left: 0.25rem;
`;

export const StyledFeedback = styled(Feedback)``;

export default function Feedback(props: Props) {
	const color = props.color || 'default';

	return (
		<FeedbackContainer className={props.className} color={color} arrow={props.arrow} shadow={props.shadow}>
			<FeedbackIcon color={color} />
			<FeedbackText>{props.text}</FeedbackText>
		</FeedbackContainer>
	);
}
