/* @flow */

// Currently, this is unused - but "we might need it later for legal reasons"

import React, { Component } from 'react';
import styled from 'styled-components';

import {
	leavingSiteDisclaimer,
	onionIncBlogs,
	storeUrls
} from '../constants';
import Button from '../../buttons';
import { EnsureDefaultTheme } from '../../theme';

type StoreRedirectProps = {
	blogGroup: string,
	displayName: string,
	redirectHandler: (string) => void
};

type StoreRedirectState = {
	countdownId: IntervalID,
	countdownSeconds: number
};

const ModalBody = styled.div`
	align-items: center;
	display: flex;
	margin: 1.25rem;
	text-align: center;

	p {
		padding: 0 2.25rem;
	}
`;

const ModalFooter = styled.footer`
	margin: 1.25rem;
	text-align: center;

	.button {
		margin: 0 5px;
	}
`;

class StoreRedirect extends Component<StoreRedirectProps, StoreRedirectState> {
	static displayName = 'Store Modal';

	state: StoreRedirectState;

	constructor(props: StoreRedirectProps) {
		super(props);

		this.state = {
			countdownId: setInterval(this.countdownTimer, 1000),
			countdownSeconds: 5
		};
	}

	componentWillUnmount = () => {
		clearInterval(this.state.countdownId);
	}

	// Counts down and redirects right when it hits 0
	countdownTimer = () => {
		if (this.state.countdownSeconds === 0) {
			return clearInterval(this.state.countdownId);
		} else if (this.state.countdownSeconds === 1) {
			this.redirectToStoreUrl();
		}

		return this.setState(prevState => ({
			...prevState,
			countdownSeconds: prevState.countdownSeconds - 1
		}));
	}

	continueClicked = () => {
		clearInterval(this.state.countdownId);
		this.redirectToStoreUrl();
	}

	redirectToStoreUrl = () => {
		const url = storeUrls[this.props.blogGroup];
		this.props.redirectHandler(url);
	}

	render() {
		const { blogGroup, displayName } = this.props;
		const { countdownSeconds } = this.state;

		const legalText = onionIncBlogs.includes(blogGroup) ? 'an Onion, Inc.' : 'a Gizmodo Media Group, LLC';

		return (
			<EnsureDefaultTheme>
				<div id={`modal-${blogGroup}-store`}>
					<h3>
						<span>Redirecting to {displayName} store in {countdownSeconds}</span>
					</h3>
					<ModalBody>
						{leavingSiteDisclaimer(legalText)}
					</ModalBody>
					<ModalFooter>
						<a onClick={this.continueClicked}>
							<Button small label='Continue' />
						</a>
					</ModalFooter>
				</div>
			</EnsureDefaultTheme>
		);
	}
}

export default StoreRedirect;
