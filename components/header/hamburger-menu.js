// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';

import media from '../../style-utils/media';
import { gridValue } from '../grid-utils';

import SearchBar from '../search-bar';
import { KinjaFormFieldWrapper } from '../form/textfield18';
import Search24 from '../icon19/Search24';
import SectionBrowser from './section-browser';
import NetworkNav from './network-nav';

import type Blog from 'kinja-magma/models/Blog';
import type RenderableSection from 'kinja-magma/models/RenderableSection';

type HamburgerMenuProps = {
	blog?: Blog,
	sections: Array<RenderableSection>,
	enableStore?: boolean,
	toggleIsScrollback?: boolean,
	impactNav?: boolean
}

const HamburgerContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;

	${props => props.impactNav && css`
		${media.largeUp`
			margin-top: 40px;
		`}
	`}
`;

const MobileSearch = styled(SearchBar)`
	display: block;

	&& {
		${media.smallOnly`
			width: ${gridValue.small('6c')};
		`}

		${media.mediumOnly`
			width: ${gridValue.medium('6c')};
		`}

		${media.mediumDown`
			margin-top: 1.5rem;
			margin-bottom: 2rem;
		`}
	}

	${KinjaFormFieldWrapper} {
		width: 100%;
		margin: 0;
	}

	${media.largeUp`
		display: none;
	`}
`;


const HamburgerMenu = ({
	blog,
	sections,
	enableStore,
	toggleIsScrollback,
	impactNav
}: HamburgerMenuProps) => {
	return (
		<HamburgerContainer impactNav={impactNav}>
			{blog && <MobileSearch
				placeholder={`Search ${blog && blog.displayName}`}
				icon={<Search24 />}
				onSearch={searchTerm => window.location.href = `/search?q=${searchTerm}&blogId=${blog.id}`}
				typeahead
			/>}
			{sections.length > 0 && <SectionBrowser
				sections={sections}
				blog={blog}
				enableStore={enableStore}
				isScrollback={toggleIsScrollback}
			/>}
			<NetworkNav isScrollback={toggleIsScrollback} />
		</HamburgerContainer>
	);
};

export default HamburgerMenu;
