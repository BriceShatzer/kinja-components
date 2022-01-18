// @flow

import * as React from 'react';
import styled from 'styled-components';
import media from '../../../style-utils/media';
import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';
import { DesktopH1, MobileH2, Footer } from '../common';

// ICONS
import BubbleIcon from '../../icon19/Bubble';
import UserAddIcon from '../../icon19/UserAdd';
import BookmarkIcon from '../../icon19/Bookmark';

import type Blog from 'kinja-magma/models/Blog';
import type { TranslateFunction } from '../../translator';

export const LogoWrapper = styled.div`
	height: calc(var(--padding) / 2);
	max-width: 200px;
	margin-bottom: var(--padding);

	${media.mediumDown`
		display: none;
	`}
`;

const FlexAside = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;

	svg {
		position: relative;
		top: 2px;
		margin-right: 10px;
	}
`;

type Props = {
	blog?: Blog,
	translate: TranslateFunction
}

export default function InfoAside(props: Props) {
	const heading = props.translate('Log in to {blogName} to:', { blogName: props.blog ? props.blog.displayName : 'Kinja' });
	return (
		<EnsureDefaultTheme>
			<FlexAside>
				<div>
					<DesktopH1>{heading}</DesktopH1>
					<MobileH2>{props.translate('Things you can do if you log in:')}</MobileH2>
					<ul>
						<li>
							<BubbleIcon />
							<span dangerouslySetInnerHTML={{
								__html: props.translate('<strong>Comment</strong> on stories')
							}} />
						</li>
						<li>
							<UserAddIcon />
							<span dangerouslySetInnerHTML={{
								__html: props.translate('<strong>Get notifications</strong> from your favorite authors and commenters')
							}} />
						</li>
						<li>
							<BookmarkIcon />
							<span dangerouslySetInnerHTML={{
								__html: props.translate('<strong>Save stories</strong> to read later')
							}} />
							<span></span>
						</li>
					</ul>
				</div>
				<Footer dangerouslySetInnerHTML={{
					__html: props.translate('By logging in, you can access these features throughout <a href="https://kinja.com/">our network.</a>')
				}} />
			</FlexAside>
		</EnsureDefaultTheme>
	);
}
