/* @flow */

import * as React from 'react';
import Cookie from 'js-cookie';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import Button19 from '../button19';

// ICONS
import MoveLeftIcon from '../icon19/MoveLeft';
import MoveRightIcon from '../icon19/MoveRight';
import MoveBottomIcon from '../icon19/MoveBottom';

type Props = {
	updateDockLocation: (location: string) => void
};

const DockSwitchContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	bottom: 0;
	margin: ${props => props.theme.columnPadding};
	position: absolute;
	left: 0;
`;

const DockButton = styled(Button19)`
	& ~ & {
		margin-left: ${props => props.theme.columnPadding};
	}
`;

const DockSwitch = (props: Props) => {
	const moveLeft = () => {
		Cookie.set('devtools-location', 'left');
		props.updateDockLocation('left');
	};

	const moveRight = () => {
		Cookie.set('devtools-location', 'right');
		props.updateDockLocation('right');
	};

	const moveBottom = () => {
		Cookie.set('devtools-location', 'bottom');
		props.updateDockLocation('bottom');
	};

	return (
		<EnsureDefaultTheme>
			<DockSwitchContainer>
				<DockButton icon={<MoveLeftIcon />} onClick={moveLeft} isSmall />
				<DockButton icon={<MoveBottomIcon />} onClick={moveBottom} isSmall />
				<DockButton icon={<MoveRightIcon />} onClick={moveRight} isSmall />
			</DockSwitchContainer>
		</EnsureDefaultTheme>
	);
};

export default DockSwitch;
