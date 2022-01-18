/* @flow */

import * as React from 'react';
import classnames from 'classnames';
import styled, { css } from 'styled-components';
import { colors } from '../theme/themes';
import Icon19 from '../icon19/icon19';

const ToolbarLink = styled.a`
	padding: 8px;
	display: inline-block;

	svg {
		color: ${colors.black};
		opacity: 0.6;
		cursor: pointer;
		pointer-events: none;
	}

	&:hover {
		svg {
			color: ${colors.primary};
			opacity: 1;
		}

		p {
			color: ${colors.primary};
		}
	}

	${props => props.disabled && css`
		svg {
			color: ${colors.gray};
			opacity: 1;
		}
	`}

	${props => props['data-active'] && css`
		svg {
			color: ${colors.primary};
			opacity: 1;
		}
	`}
`;

export type Props = {
	children?: React.Node,
	icon: React.Element<typeof Icon19>,
	title: string,
	options?: mixed,
	showtitle?: boolean,
	disabled?: boolean,
	active?: boolean,
	onClick: (Event, mixed) => void,
	className?: string
};

class ToolbarItem extends React.Component<Props> {
	onClickHandler = (event: Event) => {
		this.props.onClick(event, this.props.options);
	};

	render() {
		const { icon, title, disabled, active, showtitle, children, className } = this.props;
		return (
			<ToolbarLink
				className={classnames({
					disabled,
					active
				}, className)}
				disabled={disabled}
				onClick={event => !disabled && this.onClickHandler(event)}
				role="button"
				tabIndex={-1}
				title={title}
				data-active={active}
			>
				{icon}
				{showtitle ? <p>{title}</p> : null}
				{children}
			</ToolbarLink>
		);
	}
}

export default ToolbarItem;
