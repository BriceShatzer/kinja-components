/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	boolean,
	select
} from 'base-storybook';
import Modal from './modal';
import Login from './login';
import README from './README.md';
import styled from 'styled-components';
import gizmodoFixture from '../../__stubs__/gizmodo.json';
import Blog from 'kinja-magma/models/Blog';

const StaticModal = styled.div`
	> div {
		position: static;
		transform: none;
	}

	${Modal} {
		animation: none;
	}
`;

const gizmodo = Blog.fromJSON(gizmodoFixture);
const noop = () => undefined;

storiesOf('4. Components|Form/Login Form', module)
	.addDecorator(withDocs(README))
	.add('Login flow with no errors', () => (
		<StaticModal>
			<Modal isOpen>
				<Login
					locale={select('Locale', { 'en-US': 'en-US', 'es-ES': 'es-ES' }, 'en-US')}
					blog={gizmodo}
					onLoggedIn={noop}
					onNavigation={noop}
					error={null}
					onOAuthLoginStarted={noop}
					onClose={noop}
					loginBurner={() => Promise.resolve()}
					setScreenName={noop}
					password={null}
					onInputChange={noop}
					loading={boolean('API data loading', false)}
					createBurner={noop}
					incompleteRegistration={false}
					userNameTaken={boolean('User name taken error state', false)}
				/>
			</Modal>
		</StaticModal>
	))
	.add('Set screen name after OAuth login', () => (
		<StaticModal>
			<Modal isOpen>
				<Login
					locale={select('Locale', { 'en-US': 'en-US', 'es-ES': 'es-ES' }, 'en-US')}
					blog={gizmodo}
					onLoggedIn={noop}
					onNavigation={noop}
					onOAuthLoginStarted={noop}
					onClose={noop}
					loginBurner={() => Promise.resolve()}
					setScreenName={noop}
					password={null}
					error={null}
					onInputChange={noop}
					loading={boolean('API data loading', false)}
					createBurner={noop}
					incompleteRegistration={true}
					userNameTaken={boolean('User name taken error state', false)}
				/>
			</Modal>
		</StaticModal>
	))
	.add('Burner registration complete', () => (
		<StaticModal>
			<Modal isOpen>
				<Login
					locale={select('Locale', { 'en-US': 'en-US', 'es-ES': 'es-ES' }, 'en-US')}
					blog={gizmodo}
					onLoggedIn={noop}
					onNavigation={noop}
					onOAuthLoginStarted={noop}
					onClose={noop}
					loginBurner={() => Promise.resolve()}
					setScreenName={noop}
					password={select('Set password', { '': 'Change this to switch to password step', 'uapdg ozetq xndtd rykib': 'To this'}, '')}
					error={null}
					onInputChange={noop}
					loading={boolean('API data loading', false)}
					createBurner={noop}
					incompleteRegistration={false}
					userNameTaken={boolean('User name taken error state', false)}
				/>
			</Modal>
		</StaticModal>
	));
