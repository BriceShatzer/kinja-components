/* @flow */

import * as React from 'react';
import ToolbarItem from '../toolbar-item';
import type {Props as ToolbarItemProps} from '../toolbar-item/toolbar-item';
import styled, {css} from 'styled-components';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import Icon19 from '../icon19/icon19';

type Props = {
	children: Array<ToolbarItemProps>,
	icon: React.Element<typeof Icon19>,
	title: string,
	options?: Object,
	active?: boolean,
	isBetween?: boolean,
	isFirst?: boolean,
	isLast?: boolean,
	onClick: Event => void,
	type?: string,
	maxItemsPerRow?: number
};

const Wrapper = styled.div`
	display: flex;

	&:first-child .first-item a {
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	&:last-child .first-item a {
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
	}

	&:not(:first-child) .first-item a {
		border-top: none;
	}

	&:not(:first-child) div:not(.first-item) > a {
		height: 81px;
		margin-top: -1px;
	}

	div:not(.first-item) > a:first-child {
		border-left: none;
	}
`;

const notActiveStateStyles = css`
	&::before {
		content: '';
		border-top: 40px solid transparent;
		border-bottom: 40px solid transparent;
		border-left: 6px solid ${props => props.theme.color.white};
		height: 0;
		position: absolute;
		right: -5px;
		top: 0;
		width: 0;
		z-index: 99;
	}

	&::after {
		content: '';
		border-top: 40px solid transparent;
		border-bottom: 40px solid transparent;
		border-left: 6px solid ${props => props.theme.color.midgray};
		height: 0;
		position: absolute;
		right: -6px;
		top: 0;
		width: 0;
		z-index: 98;
	}

	a {
		cursor: pointer;
		text-decoration: none;
	}

	p {
		color: ${props => props.theme.color.darksmoke};
	}

	svg {
		color: ${props => props.theme.color.darksmoke};
	}
`;

const activeStateStyles = css`
	display: inline-flex;

	&:hover {
		display: flex;

		.first-item {
			a {

				p {
					color: ${props => props.theme.color.white};
				}

				svg {
					color: ${props => props.theme.color.white};
				}
			}

			&::before {
				display: none;
			}

			&::after {
				content: '';
				border-bottom: 40px solid transparent;
				border-left: 6px solid ${props => props.theme.color.primary};
				border-top: 40px solid transparent;
				height: 0;
				position: absolute;
				right: -6px;
				top: 0;
				width: 0;
				z-index: 99;
			}
		}
	}

	.first-item {
		a {
			background-color: ${props => props.theme.color.primary};
			border-color: ${props => props.theme.color.primary};

			svg {
				color: ${props => props.theme.color.white};
				width: 24px;
				height: 24px;
				margin: 0;
			}

			p {
				color: ${props => props.theme.color.white};
			}
		}

		&::after {
			content: '';
			border-bottom: 40px solid transparent;
			border-left: 6px solid ${props => props.theme.color.primary};
			border-top: 40px solid transparent;
			height: 0;
			position: absolute;
			right: -6px;
			top: 0;
			width: 0;
			z-index: 99;
		}
	}
`;

export const LayoutToolbarSubWrapper = styled.div`
	display: none;
	position: relative;
	${props => props.maxItemsPerRow && css`
		flex-wrap: wrap;
		max-width: ${80 * props.maxItemsPerRow}px;
	`}
	${props => props.active && activeStateStyles}
`;

export const LayoutToolbarWrapper = styled.div`
	display: inline-flex;

	a {
		text-align: center;
		background-color: ${props => props.theme.color.white};
		width: 80px;
		height: 80px;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid ${props => props.theme.color.midgray};
		outline: none;

		&:not(:first-child) {
			border-left: none;
		}

		svg {
			color: ${props => props.theme.color.darksmoke};
			opacity: 1;
			width: 24px;
			height: 24px;
		}

		p {
			margin: 0;
			font-size: 11px;
			color: ${props => props.theme.color.darksmoke};
			font-family: ${props => props.theme.typography.utility.fontFamily};
		}

		&[data-active=false] {
			display: none;
		}
	}

	div:not(.first-item) > a:last-child {
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
	}

	${props => props.childrenLength === 0 && css`
		.first-item {
			&::after {
				display: none;
			}

			&:hover {
				a {
					cursor: pointer;
				}
			}
		}
	`}

	${props => props.childrenLength > 0 && css`
		&:hover {
			${LayoutToolbarSubWrapper} {
				display: flex;
			}
		}
	`}

	&:hover a:only-child {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	${props => props.active && activeStateStyles}

	${props => !props.active && css`
		&:hover {
			${LayoutToolbarSubWrapper} {
				display: flex;
			}

			a {
				&[data-active=false] {
					display: flex;
				}
			}
		}
	`}

	&:hover {
		.first-item {
			${props => !props.active && notActiveStateStyles}
		}
	}

	.first-item {
		position: relative;
		z-index: 100;
	}

	:not(.first-item) {
		a {
			svg {
				width: 48px;
				height: 48px;
				margin: 0;
				flex-shrink: 0;
				flex-grow: 0;
			}
		}
	}
`;


class LayoutToolbar extends React.Component<Props> {
	render() {
		if (!this.props.children) {
			throw new Error('<ToolbarLayout /> should be called with existing `children` props.');
		}

		return (
			<EnsureDefaultTheme>
				<Wrapper>
					<LayoutToolbarWrapper active={this.props.active}
						childrenLength={this.props.children.length}
						isFirst={this.props.isFirst}
						isBetween={this.props.isBetween}
						isLast={this.props.isLast}>
						<span className="first-item">
							<ToolbarItem
								title={this.props.title}
								showtitle
								options={this.props.options}
								icon={this.props.icon}
								onClick={this.props.onClick}
							/>
						</span>
						<LayoutToolbarSubWrapper active={this.props.active} maxItemsPerRow={this.props.maxItemsPerRow}>
							{this.props.children.map((item, index) => {
								if (!item) {
									return <span />;
								}
								const key = `${item.title}-${index}`;
								return (
									<ToolbarItem
										key={`toolbar-item-${key}`}
										title={item.title}
										showtitle
										icon={item.icon}
										options={item.options}
										onClick={item.onClick}
										className={item.className}
									/>
								);
							})}
						</LayoutToolbarSubWrapper>
					</LayoutToolbarWrapper>
				</Wrapper>
			</EnsureDefaultTheme>
		);
	}
}

export default LayoutToolbar;
