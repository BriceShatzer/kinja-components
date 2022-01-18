// @flow

import * as React from 'react';
import styled from 'styled-components';
import type Blog from 'kinja-magma/models/Blog';
import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';

// ICONS
import ArrowLeftIcon from '../../icon19/ArrowLeft';
import BurnerIcon from '../../icon19/Burner';

import { BackButton, DesktopH2, MobileH2 } from '../common';
import type { TranslateFunction } from '../../translator';

const UnorderedListElement = styled.ul`
	svg {
		position: relative;
		top: 2px;
		margin-right: 10px;
	}
`;

type Props = {
	blog?: Blog,
	onBackClick: () => void,
	canGoBack: boolean,
	create: boolean,
	translate: TranslateFunction
}

export default function BurnerInfoAside(props: Props) {
	// We have different texts appearing on mobile since there we also have text appearing on the top (right) side of the component, and
	// it would be strange if they were the same.
	const heading = props.create ? props.translate('Create a burner account') : props.translate('Sign in with a burner account');
	const mobileHeading = props.translate('About burner accounts');
	const burnerDescription = props.translate(
		`Burner accounts are the way to use {siteName}
		<a href="https://kinja.zendesk.com/hc/en-us/articles/360004485314-What-is-a-Burner-account-">completely anonymously.</a>`,
		{siteName: props.blog ? props.blog.displayName : 'Kinja'}
	);
	return (
		<EnsureDefaultTheme>
			<React.Fragment>
				{props.canGoBack && (
					<BackButton>
						{/** Provide a random key so that it rerenders, and won't be stuck in a focused state */}
						<a tabIndex="0" onClick={props.onBackClick} onKeyPress={props.onBackClick} key={Math.random()}>
							<ArrowLeftIcon /> {props.translate('Back')}
						</a>
					</BackButton>
				)}
				<DesktopH2>{heading}</DesktopH2>
				<MobileH2>{mobileHeading}</MobileH2>
				<UnorderedListElement>
					<li>
						<BurnerIcon />
						<span dangerouslySetInnerHTML={{
							__html: burnerDescription
						}} />
					</li>
				</UnorderedListElement>
			</React.Fragment>
		</EnsureDefaultTheme>
	);
}
