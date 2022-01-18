/* @flow */

import * as React from 'react';
import Cookie from 'js-cookie';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import media from '../../style-utils/media';
import Button19 from '../button19';
import Toggle from '../hoc/toggle';
import type { ToggleInjectedProps } from '../hoc/toggle';

// ICONS
import CloseIcon from '../icon19/Close';
import GearIcon from '../icon19/Gear';

import EnvSwitch from './env-switch';
import FeatureSwitcher from './feature-switcher';
import type { FeatureSwitch } from './feature-switcher';
import AdSwitch from './ad-switch';
import DockSwitch from './dock-switch';

type Props = {
	onFeatureSwitchChange: FeatureSwitch => void,
	featureSwitches: Array<FeatureSwitch>
} & ToggleInjectedProps;

type State = {
	location: string
}

const FixedContainer = styled.div`
	bottom: 0;
	height: 100vh;
	pointer-events: none;
	position: fixed;
	right: 0;
	width: 100vw;
	z-index: 1000;
	${media.mediumDown`display: none;`};
`;

const GearButton = styled(Button19)`
	bottom: 0;
	margin: ${props => props.theme.columnPadding};
	pointer-events: auto;
	position: absolute;
	right: 0;
`;

const CloseButton = styled(Button19)`
	bottom: 0;
	margin: ${props => props.theme.columnPadding};
	pointer-events: auto;
	position: absolute;
	right: 0;
`;

const Dock = styled.div`
	background: rgba(231, 231, 231, 0.95);
	height: 100%;
	padding: ${props => props.theme.columnPadding};
	pointer-events: auto;
	position: absolute;
	right: 0;
	width: 320px;
	${props => (props.location === 'left' ? 'left: 0;' : '')};
	${props => (props.location === 'bottom' ? 'bottom: 0; height: 320px; width: 100%;' : '')};
`;

class DevToolsContainer extends React.Component<Props, State> {
	state = {
		location: 'right'
	};

	componentDidMount() {
		const location = Cookie.get('devtools-location');
		if (!location) {
			Cookie.set('devtools-location', 'right');
		} else {
			this.setState({
				location
			});
		}
	}

	updateDockLocation = (location: string) => {
		this.setState({
			location
		});
	};

	render() {
		const { isOpen, toggle, close, insideReference, featureSwitches, onFeatureSwitchChange } = this.props;

		return (
			<EnsureDefaultTheme>
				<FixedContainer>
					{isOpen ? (
						<div ref={insideReference}>
							<Dock location={this.state.location}>
								<FeatureSwitcher featureSwitches={featureSwitches} onFeatureSwitchChange={onFeatureSwitchChange} />
								<AdSwitch />
								<EnvSwitch />
								<DockSwitch updateDockLocation={this.updateDockLocation} />
							</Dock>
							<CloseButton icon={<CloseIcon />} onClick={close} variant="tertiary" />
						</div>
					) : (
						<GearButton icon={<GearIcon />} onClick={toggle} />
					)}
				</FixedContainer>
			</EnsureDefaultTheme>
		);
	}
}

export { DevToolsContainer as DevToolsContainerWithoutHOC };

export default Toggle(DevToolsContainer, {
	isOutsideClickEnabled: true
});
