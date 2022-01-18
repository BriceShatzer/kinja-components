// @flow //
import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import CloseIcon from '../icon19/Close';
import { Transition } from 'react-transition-group';

export type NotificationType = 'default' | 'error' | 'success' | 'alert';

const NOTIFICATION_DISPLAY_TIME = 5000;

type Props = {
	message: React.Node,
	dismissable?: boolean,
	url?: string,
	type: NotificationType,
	fullWidth?: boolean,
	timeout?: number,
	permanent?: boolean
};

const getBackgroundColor = ({ theme, type }) => {
	switch (type) {
		case 'error': {
			return theme.color.error;
		}
		case 'success': {
			return theme.color.success;
		}
		case 'alert': {
			return theme.color.alert;
		}
		default: {
			return theme.color.lightgray;
		}
	}
};

export const NotificationContainer = styled.div`
	color: ${({ type, theme }) => (type === 'default' || type === 'alert' ? theme.color.bodyText : theme.color.white)};
	padding: 15px 15px 13px;
	background-color: ${props => getBackgroundColor(props)};
	width: ${({ fullWidth }) => (fullWidth ? '100%' : '280px')};
	z-index: 1000;
	opacity: ${({ transitionState }) => (transitionState === 'entering' ? '0' : '1')};
	max-height: ${({ transitionState }) => (transitionState === 'exiting' ? '0px' : 'inherit')};
	padding-top: ${({ transitionState }) => (transitionState === 'exiting' ? '0px' : '15px')};
	padding-bottom: ${({ transitionState }) => (transitionState === 'exiting' ? '0px' : '15px')};
	transition: opacity 0.3s, max-height 0.3s, padding-top 0.3s, padding-bottom 0.3s;
	${({ url }) => url && url.length && 'cursor: pointer'};
	overflow: hidden;
	position: ${({ fullWidth }) => (fullWidth ? 'relative' : 'fixed')};
	${({ fullWidth }) =>
		!fullWidth &&
		`top: 70px;
		right: 0px;`} button {
		margin-left: 10px;
		float: right;
	}
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	button:hover,
	button:active,
	button:focus {
		background: transparent;
	}

	svg {
		color: ${({ theme, type }) => type === 'default' || type === 'alert' ? theme.color.black : theme.color.white};
	}
`;

const Notification = (props: Props) => {
	const [hide, setHide] = React.useState(false);
	const notificationRefTimeoutId = React.useRef();

	const onDismiss = () => {
		setHide(true);
		clearTimeout(notificationRefTimeoutId.current);
	};

	React.useEffect(() => {
		if (!props.permanent) {
			notificationRefTimeoutId.current = setTimeout(onDismiss, props.timeout);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const { dismissable, url, message, type, fullWidth } = props;
	return (
		<EnsureDefaultTheme>
			<Transition in={!hide} timeout={300} unmountOnExit={true}>
				{state => (
					<NotificationContainer
						transitionState={state}
						onClick={url && url.length ? () => window.location.replace(url) : null}
						type={type}
						fullWidth={fullWidth}
						url={url}
					>
						{typeof message === 'string' ?
							<span dangerouslySetInnerHTML={{__html: message}}/>
							:
							<span>{message}</span>
						}
						{dismissable && (
							<button onClick={onDismiss}>
								<CloseIcon />
							</button>
						)}
					</NotificationContainer>
				)}
			</Transition>
		</EnsureDefaultTheme>
	);
};

Notification.defaultProps = {
	timeout: NOTIFICATION_DISPLAY_TIME
};

export default Notification;
