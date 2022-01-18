// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import media from '../../../style-utils/media';
import type Blog from 'kinja-magma/models/Blog';
import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';
import { H2 } from '../common';
import type { Provider } from '../forms/oauth-login';
import type { TranslateFunction } from '../../translator';

type Props = {
	blog?: Blog,
	provider: Provider | 'burner',
	translate: TranslateFunction
}

const WelcomeLayout = styled.div`
	display: flex;
	font-family: ${props => props.theme.typography.headline.fontFamily};

	${props => props.theme.typography.headline.fontFamily === 'ElizabethSerif, Georgia, serif' && css`
		font-size: 15px;
	`}
`;

const WelcomeEmoji = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: var(--padding);
	line-height: 1;
	padding-top: calc(var(--padding) / 6);
	margin-right: calc(var(--padding) * 0.75);

	${media.mediumDown`
		align-items: flex-start;
	`}
`;

const WelcomeH2 = styled(H2)`
	margin-bottom: calc(var(--padding) / 6);

	${media.mediumDown`
		margin-bottom: calc(var(--padding) / 6);
	`}
`;

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const providerMessage = (provider: Provider | 'burner', translate: TranslateFunction) => provider === 'burner' ?
	translate('You successfully created a burner account.') :
	translate('You successfully connected with {provider}.', { provider: capitalize(provider) });

export default function WelcomeInfoAside(props: Props) {
	const welcomeText = props.translate('Yay! Welcome to {blogName}!', { blogName: props.blog ? props.blog.displayName : 'Kinja' });
	return (
		<EnsureDefaultTheme>
			<WelcomeLayout>
				<WelcomeEmoji>👋</WelcomeEmoji>
				<div>
					<WelcomeH2>{welcomeText}</WelcomeH2>
					<div>
						{providerMessage(props.provider, props.translate)}
						<br/>{props.translate('Now you can write comments, follow authors and save articles.')}
					</div>
				</div>
			</WelcomeLayout>
		</EnsureDefaultTheme>
	);
}
