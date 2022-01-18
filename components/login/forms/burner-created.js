/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

// ICONS
import CopyIcon from '../../icon19/Copy';
import CheckmarkIcon from '../../icon19/Checkmark';
import ErrorIcon from '../../icon19/Error';
import ArrowRightIcon from '../../icon19/ArrowRight';

import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';
import { CenteredButton, H2 } from '../common';
import type { TranslateFunction } from '../../translator';

type Props = {
	onCloseClick: () => void,
	password: string,
	translate: TranslateFunction
};

type State = {
	copied: boolean
};

const Warning = styled.div`
	color: ${props => props.theme.color.error};
	display: flex;
	margin-bottom: calc(var(--padding) / 1.25);

	svg {
		margin-bottom: 2px;
		margin-right: calc(var(--padding) / 6);
		color: ${props => props.theme.color.error};
		flex-shrink: 0;
	}
`;

const Password = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: calc(var(--padding) / 2);

	h2 {
		font-family: ${props => props.theme.typography.utility.fontFamily};
		font-size: 21px;
		font-weight: 800;
		margin-bottom: 0;
	}

	a {
		color: ${props => props.theme.color.primary};
		margin-left: calc(var(--padding) / 6);

		svg {
			margin-right: 4px;
		}

		&:hover {
			color: ${props => darken(0.2, props.theme.color.primary)};
			text-decoration: none;

			svg[name=copy] {
				fill: ${props => darken(0.2, props.theme.color.primary)};
			}

			svg[name=checkmark] {
				color: ${props => darken(0.2, props.theme.color.primary)};
			}
		}
	}
`;

class BurnerCreated extends React.Component<Props, State> {
	state = {
		copied: false
	}
	copyPassword = (event: SyntheticEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		if (typeof document !== 'undefined' && document.body) {
			const body = document.body;
			const textfield = document.createElement('textarea');
			textfield.value = this.props.password;
			body.appendChild(textfield);
			textfield.select();
			document.execCommand('copy');
			body.removeChild(textfield);
			this.setState({
				copied: true
			});
		}
	}
	render() {
		return (
			<EnsureDefaultTheme>
				<React.Fragment>
					<div>{this.props.translate('Here\'s the password for your burner account:')}</div>
					<Password>
						<H2>{this.props.password}</H2>
						{this.state.copied ?
							(<a href="" onClick={this.copyPassword}>
								<CheckmarkIcon />{this.props.translate('Copied')}
							</a>) :
							(<a href="" onClick={this.copyPassword}>
								<CopyIcon />{this.props.translate('Copy')}
							</a>)
						}
					</Password>
					<Warning>
						<ErrorIcon />
						<div dangerouslySetInnerHTML={{
							__html: this.props.translate(`Your password is not changeable nor recoverable, so please write it down.
							If you lose it, you will be locked out of this account permanently.`)
						}} />
					</Warning>
					<CenteredButton
						icon={<ArrowRightIcon />}
						label={this.props.translate('Got it, let\'s get started!')}
						labelPosition='before'
						weight='primary'
						onClick={this.props.onCloseClick}
					/>
				</React.Fragment>
			</EnsureDefaultTheme>
		);
	}
}

export default BurnerCreated;
