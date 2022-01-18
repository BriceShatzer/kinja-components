// @flow
import styled, { css } from 'styled-components';
import media from '../../style-utils/media';
import { InStreamVideoContainer } from 'kinja-components/components/ad-slot/ads';

// wrap each component that goes in the Sidebar in a SidebarModule
// this keeps padding/layout consistent but allows for easy
// implementation of e.g. full-bleed sidebar modules
//  - YMAL module has override for extra bottom padding before first
//    ad, otherwise all modules have consistent spacing
export const SidebarModule = styled.div`
	padding: 31px 0;
	border-bottom: 1px solid ${props => props.theme.color.lightgray};
	min-width: ${props => props.theme.sidebarContentMinWidth};
	max-width: ${props => props.withStandardGrid ? '100%' : props.theme.SidebarContentMaxWidth};
	&:last-child {
		border-bottom: none;
	}
	display: flex;
	justify-content: center;
	flex-direction: column;

	${InStreamVideoContainer} {
		${media.largeUp`
			display: block;
		`}
	}

	${props => props.id && props.id === 'trending_wrapper' && css`
		padding: 31px 0 88px 0;
	`};
`;

export const SidebarAdModule = styled.div`
	& [data-ad-load-state=loaded] {
		padding: 31px 0;
		border-bottom: 1px solid ${props => props.theme.color.lightgray};
		min-width: ${props => props.theme.sidebarContentMinWidth};
		max-width: ${props => props.withStandardGrid ? '100%' : props.theme.SidebarContentMaxWidth};
		display: flex;
		justify-content: center;
	}
`;

// the placeholder/wrapper that the Sidebar should be rendered into,
// keeps layout intact even without the sidebar present
export const SidebarWrapper = styled.aside`
	display: none;
	${media.xlargeUp`
		display: flex;
		flex-flow: column nowrap;
		width: ${props => props.theme.sidebarContainerWidth};
		/* sidebar on the left */
		order: 2;
		border-left: 1px solid ${props => props.theme.color.lightgray};
		${props => props.withStandardGrid && 'border: none;'}
		padding: 0 ${props => props.theme.columnPadding};
		align-items: flex-end;
	`}
`;

// optional wrapper to be used around SidebarModules, to be used inside SidebarWrapper
// takes full width and height of SidebarWrapper
// useful if one wants to calculate available space, for example
export const SidebarContent = styled.div`
	flex-grow: 1;
	display: flex;
	flex-flow: column nowrap;
	align-items: stretch;
`;
