/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import { getKinjaHost } from 'kinja-components/utils/url';
import { EnsureDefaultTheme } from '../../theme';

// ICONS
import ChevronLeftIcon from '../../icon19/ChevronLeft';
import WriteIcon from '../../icon19/Write';
import EmbiggenIcon from '../../icon19/Embiggen';
import EmbiggenFilledIcon from '../../icon19/EmbiggenFilled';

import Toggle from '../../hoc/toggle';
import Link, { Anchor } from '../../elements/link';

import type { ToggleInjectedProps } from '../../hoc/toggle';


export const Container = styled.div`
	display: flex;
	width: 29px;
	height: 100%;
	overflow: hidden;
	transition: width 0.3s ease-out;

	${props => props.isOpen && css`
		width: 100px;
	`}
`;

export const SwipeIconContainer = styled.div`
	height: 100%;
	margin-right: 10px;
	border-right: 1px solid ${props => props.isEmbiggened ? props.theme.color.primary : props.theme.color.lightgray};

	svg {
		color: ${props => props.theme.color.primary};
	}
`;

const SwipeIcon = styled.div`
	position: relative;
	display: block;
	right: -9px;
	top: calc(50% - 12px);
	background-color: ${props => props.theme.color.white};
	cursor: pointer;

	svg {
		transition: all 0.3s ease-out;
	}

	${props => props.isOpen && css`
		svg {
			transform: rotate(180deg);
		}
	`}
`;

const IconContainer = styled.div`
	position: relative;
	grid-column: 2;
	grid-row: 1 / 3;
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr;
	width: 70px;
	height: 100%;

	${Anchor} {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	> svg {
		align-self: center;
		justify-self: center;
	}
	
	svg {
		color: ${props => props.theme.color.gray};
	}

	${Anchor}:hover {
		svg {
			color: ${({ theme }) => theme.color.primary};
		}
	}
`;

export const EmbiggenIconContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	svg {
		color: ${props => props.isEmbiggened ? props.theme.color.primary : props.theme.color.gray};
	}

	&:hover {
		svg {
			color: ${({ theme, isEmbiggened }) => isEmbiggened ? theme.color.gray : theme.color.primary};
		}
	}
`;


type Props = {
	isEmbiggened?: boolean,
	onEmbiggenClick: (postId: number | string, isEmbiggened: boolean, permalink: string) => void,
	onDrawerMenuIconClick: (isOpen: boolean) => void,
	permalink: string,
	postId: number | string
} & ToggleInjectedProps;

class DrawerMenu extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen !== this.props.isOpen) {
			this.props.onDrawerMenuIconClick(this.props.isOpen);
		}
	}

	render() {
		const {
			insideReference,
			isEmbiggened,
			isOpen,
			onEmbiggenClick,
			permalink,
			postId,
			toggle
		} = this.props;

		const embiggenProps = onEmbiggenClick && postId
			? { onClick: () => onEmbiggenClick(postId, !isEmbiggened, permalink) }
			: null;

		return (
			<EnsureDefaultTheme>
				<Container isOpen={isOpen} ref={insideReference}>
					<SwipeIconContainer isEmbiggened={isEmbiggened}>
						<SwipeIcon isOpen={isOpen}>
							<ChevronLeftIcon onClick={toggle} />
						</SwipeIcon>
					</SwipeIconContainer>
					<IconContainer>
						<Link data-ga={`[["Manage page click", "Posts - Edit post click", "${permalink}"]]`}
							href={`http://${getKinjaHost()}/write/${postId}` }
						>
							<WriteIcon />
						</Link>
						<EmbiggenIconContainer isEmbiggened={isEmbiggened} {...embiggenProps}>
							{isEmbiggened ? <EmbiggenFilledIcon /> : <EmbiggenIcon />}
						</EmbiggenIconContainer>
					</IconContainer>
				</Container>
			</EnsureDefaultTheme>
		);
	}
}


export default Toggle(DrawerMenu, { isOutsideClickEnabled: true, isDefaultOpen: false });
