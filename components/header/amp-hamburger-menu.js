// @flow

import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Hamburger24 from '../icon19/Hamburger24';
import Close24 from '../icon19/Close24';
import SectionBrowser from './section-browser';
import NetworkNav from './network-nav';
import MobileTagline from './mobile-tagline';

import type RenderableSection from 'kinja-magma/models/RenderableSection';
import type Blog from 'kinja-magma/models/Blog';

const SidebarStyle = createGlobalStyle`
	div[class*=amphtml-sidebar-mask] {
		background: transparent;
	}
`;

const OpenButton = styled.div``;
const CloseButton = styled.div`
	display: none;
`;

const Container = styled.div`
	display: flex;

	amp-sidebar {
		top: 52px;
		width: 100%;
		max-width: 100vw;
		background: ${props => props.theme.color.white};
	}

	amp-sidebar[open] + button {
		${OpenButton} {
			display: none;
		}
		${CloseButton} {
			display: block;
		}
	}
`;

const SidebarContent = styled.div`
	border-top: 1px solid ${props => props.theme.color.lightgray};
	padding: 24px 0 48px;
`;

export type AmpHamburgerMenuProps = {
	sections: Array<RenderableSection>,
	blog?: Blog,
	enableStore?: boolean,
	tagline: ?string
}

const AmpHamburgerMenu = ({
	sections,
	blog,
	enableStore,
	tagline
}: AmpHamburgerMenuProps) => {
	return (
		<Container>
			<SidebarStyle/>
			<amp-sidebar
				id="sidebar"
				layout="nodisplay"
				side="right"
			>
				<MobileTagline>{tagline}</MobileTagline>
				<SidebarContent>
					{sections.length > 0 && <SectionBrowser
						sections={sections}
						blog={blog}
						enableStore={enableStore}
					/>}
					<NetworkNav/>
				</SidebarContent>
			</amp-sidebar>
			<button on="tap:sidebar.toggle">
				<OpenButton>
					<Hamburger24/>
				</OpenButton>
				<CloseButton>
					<Close24/>
				</CloseButton>
			</button>
		</Container>
	);
};

export default AmpHamburgerMenu;
