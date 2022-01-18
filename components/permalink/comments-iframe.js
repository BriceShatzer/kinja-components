// @flow

import * as React from 'react';
import styled from 'styled-components';

import OnScreen from '../hoc/on-screen';
import typeof UserState from 'kinja-magma/client/userState';
import { animateScroll } from 'react-scroll';
import Button, { ButtonInner } from '../buttons/Button';
import media from '../../style-utils/media';
import Analytics, { type AnalyticsInjectedProps } from '../hoc/analytics';

import type { BlogThemeName } from 'kinja-components/components/theme/theme';
import type { OnScreenInjectedProps } from '../hoc/on-screen';

export const CTA = styled(Button)`
	margin: 32px auto;
	max-width: 636px;
	padding: 16px 0;
	display: block;
	font-size: 18px;
	line-height: 23px;
	height: auto;
	width: 100%;

	${ButtonInner} {
		flex-direction: column;

		svg {
			margin-bottom: 8px;
		}
	}

	${media.smallOnly`
		margin: 32px 1.125rem;
		width: calc(100vw - 2.5rem);
	`}
`;

const Iframe = styled.iframe`
	width: 100%;
	margin: 0 auto;
	overflow: hidden;

	${props => props.fullscreen && `
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		max-width: none;
		height: 100%;
		z-index: 100;
		overflow: auto;
	`}
`;

const scroll = (to: number, animated?: boolean) => animated ? animateScroll.scrollTo(to) : window.scrollTo({ top: to });

type State = {
	fullscreen: boolean,
	placeholderHeight: number,
	isOpen: boolean,
	preloadComments: boolean
}

type Props = {
	blogTheme: BlogThemeName,
	performanceMark: string,
	isOpen: boolean,
	onCancel?: () => void,
	replyCount?: number,
	userState?: UserState,
} & OnScreenInjectedProps & AnalyticsInjectedProps;

class CommentsIframe extends React.Component<Props, State> {
	iframeRef = React.createRef<HTMLIFrameElement>();
	state = {
		fullscreen: false,
		placeholderHeight: 0,
		isOpen: this.props.isOpen,
		preloadComments: false
	};

	startLoadingComments() {
		this.setState({ preloadComments: true });
	}

	componentDidMount() {
		if (window.performance) {
			window.performance.measure('frontend.comments.load.component', this.props.performanceMark);
		}
		if (window.requestIdleCallback) {
			window.requestIdleCallback(() => this.startLoadingComments());
		} else {
			window.setTimeout(() => this.startLoadingComments(), 1);
		}

		window.addEventListener('message', event => {
			if (event.data.ga) {
				window.ga.apply(window.ga, event.data.ga);
			}

			const command = event.data.magma;
			if (!command) {
				return;
			}

			switch (command) {
				case 'openModal': {
					const iframeHeightBeforeFullscreen = this.iframeRef.current ? this.iframeRef.current.offsetHeight : 0;
					this.setState({ fullscreen: true, placeholderHeight: iframeHeightBeforeFullscreen });
					return;
				}
				case 'closeModal': {
					this.setState({ fullscreen: false });
					return;
				}
				case 'scrollTop': {
					const iframe = this.iframeRef.current;
					const shouldAnimate = event.data.animated;
					if (iframe) {
						const iframePos = iframe.getBoundingClientRect().top + window.pageYOffset;
						if (event.data.offset) {
							scroll(iframePos + event.data.offset, shouldAnimate);
						} else {
							scroll(iframePos - 100, shouldAnimate);
						}
					}
					return;
				}
				case 'login': {
					// When we log in inside the iframe, trigger user state change on main page
					this.props.userState && this.props.userState.login();
					return;
				}
				case 'facetShown': {
					if (window.performance) {
						window.performance.measure('frontend.comments.load.iframe', this.props.performanceMark);
					}
					return;
				}
				case 'emptyInitialState':
				case 'openEditor': {
					if (this.iframeRef.current) {
						this.iframeRef.current.contentWindow.postMessage({
							magma: 'openEditor'
						}, '*');
					}
					return;
				}
				case 'unmountIframe': {
					if (this.props.onCancel) {
						this.props.onCancel();
					}
				}
			}
		});

		if (this.props.userState) {
			this.props.userState.subscribe(() => {
				if (this.iframeRef.current) {
					this.iframeRef.current.contentWindow.postMessage({
						magma: 'login'
					}, '*');
				}
			});
		}
	}
	expand = () => {
		this.setState({
			isOpen: true
		});
		this.props.ga('Group Chats', 'Expand Truncated Comments');
	}
	render() {
		return (this.props.isVisible || this.state.preloadComments) ?
			(<React.Fragment>
				<Iframe ref={this.iframeRef} fullscreen={this.state.fullscreen} className="js_comments-iframe" {...this.props} />
				{this.state.fullscreen && <div style={{ height: this.state.placeholderHeight + 'px' }}></div>}
			</React.Fragment>) :
			null;
	}
}

export default Analytics(OnScreen(CommentsIframe, {
	offset: typeof window !== 'undefined' ? window.innerHeight * 1.5 : undefined, once: true, partialVisibility: true
}));
