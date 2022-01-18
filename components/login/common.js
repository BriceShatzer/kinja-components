// @flow
import styled, { css } from 'styled-components';
import Button from '../buttons';
import { darken} from 'polished';
import media from '../../style-utils/media';

export const screenNameRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]+$/;

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
`;

Form.defaultProps = {
	onSubmit: (event: Event) => event && event.preventDefault()
};

export const CenteredButton = styled(Button)`
	display: block;
	margin: 0 auto;
`;

export const NavButton = styled.div`
	display: flex;
	height: 30px;
	margin-bottom: var(--padding);
	color: ${props => props.theme.color.primary};
	user-select: none;

	svg {
		color: ${props => props.theme.color.primary};
	}

	a {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		&:hover {
			color: ${props => darken(0.2, props.theme.color.primary)};

			svg {
				color: ${props => darken(0.2, props.theme.color.primary)};
			}
		}
	}

	${media.mediumDown`
		display: inline-flex;
	`}
`;

export const CloseButton = styled(NavButton)`
	justify-content: flex-end;
	margin-bottom: 0;

	a {
		width: 30px;
	}

	/* don't display it inside the old user menu, since it has its own close button next to the tabs */
	.dui-modal-login & {
		display: none;
	}

	${media.mediumDown`
		position: fixed;
		top: 16px;
		right: 16px;
	`}
`;

export const BackButton = styled(NavButton)`
	justify-content: flex-start;
	margin-bottom: calc(var(--padding) / 2);

	a:hover {
		text-decoration: none;
	}

	svg {
		margin-right: 10px;
		margin-bottom: 2px;
	}
`;

/**
 * A back button that only displays on mobile. We have the back button in different places than on desktop.
 */
export const MobileBackButton = styled(BackButton)`
	${media.largeUp`
		display: none;
	`}
`;

export const H1 = styled.h1`
	font-family: ${props => props.theme.typography.headline.fontFamily};
	font-size: 36px;
	line-height: 1.3;
	font-weight: 900;
	margin-bottom: calc(var(--padding) / 2);

	${media.mediumDown`
		font-size: 32px;
		margin-top: 0;
		margin-bottom: var(--padding);

		${props => props.theme.typography.headline.fontFamily === 'ElizabethSerif, Georgia, serif' && css`
			font-size: 26px;
		`}
	`}
`;

export const H2 = styled.h2`
	font-family: ${props => props.theme.typography.headline.fontFamily};
	font-size: 32px;
	line-height: 1.3;
	font-weight: 900;
	margin-bottom: calc(var(--padding) / 2);

	${props => props.theme.typography.headline.fontFamily === 'ElizabethSerif, Georgia, serif' && css`
		font-size: 26px;
	`}

	${media.mediumDown`
		font-size: 21px;
		margin-top: 0;
		margin-bottom: var(--padding);

		${props => props.theme.typography.headline.fontFamily === 'ElizabethSerif, Georgia, serif' && css`
			font-size: 18px;
		`}
	`}
`;

/**
 * These are texts that don't appear on all viewports
 */
export const MobileH1 = styled(H1)`
	${media.largeUp`
		display: none;
	`}
`;

export const MobileH2 = styled(H2)`
	${media.largeUp`
		display: none;
	`}
`;

export const DesktopH1 = styled(H1)`
	${media.mediumDown`
		display: none;
	`}
`;

export const DesktopH2 = styled(H2)`
	${media.mediumDown`
		display: none;
	`}
`;

export const Footer = styled.footer`
	text-align: left !important;
	font-size: 16px;
	line-height: 21px;
	color: ${props => props.theme.color.secondarytext};

	${media.mediumDown`
		margin-top: var(--padding);
	`}
`;
