/* @flow */

import * as React from 'react';
import styled from 'styled-components';

// ICONS
import ArrowRightIcon from '../../icon19/ArrowRight';

import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';
import ScreenNameInput from './screen-name-input';
import { CenteredButton } from '../common';
import type { TranslateFunction } from '../../translator';

type Props = {
	onInputChange: () => void,
	onSubmit: (screenName: string) => void,
	loading: boolean,
	userNameTaken?: boolean,
	translate: TranslateFunction
};

type State = {
	screenName: string,
	error: boolean
};

const TextFieldWrapper = styled.div`
	margin-bottom: calc(var(--padding) / 1.25);
`;

/**
 * This form is shown after a user connects with OAuth and doesn't have a screenName set yet,
 * indicatad by their 'incomplete' status
 */
class SetScreenName extends React.Component<Props, State> {
	onScreenNameChange: (screenName: ?string) => void;
	onSubmit: () => void

	state = {
		screenName: '',
		error: false
	};

	constructor(props: Props) {
		super(props);
		this.onScreenNameChange = this.onScreenNameChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onScreenNameChange(screenName: ?string) {
		if (screenName === null) {
			this.setState({
				screenName: '',
				error: true
			});
		} else {
			this.setState({
				screenName,
				error: false
			});
		}
		// Notify the controller that input has changes, so we can clear errors passed down
		this.props.onInputChange();
	}

	onSubmit() {
		this.props.onSubmit(this.state.screenName);
	}

	render() {
		const isError = this.state.error || this.props.userNameTaken;
		return (
			<EnsureDefaultTheme>
				<form>
					<TextFieldWrapper>
						<ScreenNameInput
							onChange={this.onScreenNameChange}
							userNameTaken={Boolean(this.props.userNameTaken)}
							inlineHelp={this.props.translate('This will appear next to your comments.')}
							label={this.props.translate('Set your User Name')}
							placeholder=""
							translate={this.props.translate}
						/>
					</TextFieldWrapper>
					<CenteredButton
						icon={this.props.loading ? undefined : <ArrowRightIcon />}
						label={this.props.loading ? this.props.translate('Loading...') : this.props.translate('Let\'s get started!')}
						labelPosition='before'
						weight='primary'
						onClick={this.onSubmit}
						disabled={this.state.screenName.length === 0 || isError || this.props.loading}
					/>
				</form>
			</EnsureDefaultTheme>
		);
	}
}

export default SetScreenName;
