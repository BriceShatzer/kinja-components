// @flow

import * as React from 'react';

export type StylesProps = {
	brandColors: {
		logo: string,
		primary: string
	},
	logoWidth: string
};

const paddings = {
	large: '42px',
	normal: '28px',
	small: '16px'
};

const colors = {
	body: '#f5f5f5',
	text: '#222',
	footerText: '#666'
};

const footerFontSize = '14px';

const fonts = {
	sansSerif: '\'Helvetica Neue\',Helvetica,Arial,sans-serif',
	serif: 'ElizabethSerif,Georgia,serif'
};

export type NewsletterCss = {[string]: {[string]: string}};

export const StylesContext: React.Context<NewsletterCss> = React.createContext({
	body: {}
});

export const getStyles = ({
	brandColors,
	logoWidth
}: StylesProps): NewsletterCss => ({
	body: {
		margin: '0',
		padding: '0',
		backgroundColor: colors.body,
		fontFamily: 'HelveticaNeue,Helvetica,sans-serif',
		color: colors.text
	},
	wrapper: {
		margin: `${paddings.large} auto 0`,
		width: '540px',
		backgroundColor: '#fff'
	},
	header: {
		width: '100%',
		borderSpacing: '0',
		padding: `${paddings.normal} ${paddings.large}`,
		backgroundColor: brandColors.logo,
		color: '#fff',
		fontSize: '20px'
	},
	bloglogoTd: {
		padding: '0'
	},
	bloglogo: {
		width: logoWidth,
		verticalAlign: 'middle',
		color: '#fff',
		fontSize: '20px'
	},
	subtitle: {
		padding: '0',
		color: '#fff',
		fontSize: '14px',
		textAlign: 'right'
	},
	heading1Link: {
		textDecoration: 'none'
	},
	heading1: {
		margin: `${paddings.large} ${paddings.large} ${paddings.normal} ${paddings.large}`,
		padding: '0',
		color: colors.text,
		fontSize: '30px',
		fontStyle: 'normal',
		fontVariant: 'normal',
		fontWeight: 'bold',
		textDecoration: 'none',
		lineHeight: '1.3',
		fontFamily: fonts.sansSerif
	},
	leadImage: {
		width: '100%',
		height: 'auto',
		margin: '0',
		padding: '0',
		textAlign: 'center',
		outlineStyle: 'none',
		textDecoration: 'none',
		borderStyle: 'none'
	},
	leadText: {
		margin: '0',
		padding: `${paddings.normal} ${paddings.large} ${paddings.large} ${paddings.large}`,
		color: colors.text,
		fontFamily: fonts.serif,
		fontSize: '17px',
		fontWeight: '400',
		lineHeight: paddings.normal
	},
	message: {
		margin: `${paddings.normal} ${paddings.large} ${paddings.small} ${paddings.large}`,
		padding: '0',
		color: colors.text,
		fontFamily: fonts.serif,
		fontSize: '17px',
		fontWeight: '400',
		lineHeight: '28px'
	},
	button: {
		display: 'block',
		margin: `${paddings.small} ${paddings.large} ${paddings.normal} ${paddings.large}`,
		padding: '11px 0',
		textAlign: 'center',
		textDecoration: 'none',
		fontFamily: fonts.sansSerif,
		fontSize: '16px',
		lineHeight: '18px',
		borderRadius: '5px'
	},
	confirmButton: {
		backgroundColor: brandColors.logo,
		color: '#fff'
	},
	unsubscribeButton: {
		backgroundColor: '#fff',
		color: colors.text,
		lineHeight: '16px',
		border: 'solid 2px #e5e5e5',
		marginBottom: paddings.large
	},
	footer: {
		padding: `${paddings.large} 0`,
		backgroundColor: colors.body,
		color: colors.footerText,
		fontFamily: fonts.sansSerif,
		fontSize: footerFontSize,
		lineHeight: '21px',
		textAlign: 'center'
	},
	visitSiteButtonWrapper: {
		display: 'block',
		margin: `${paddings.small} 0 0 0`
	},
	visitSiteButton: {
		display: 'inline-block',
		madgin: '0',
		padding: `11px ${paddings.normal}`,
		textAlign: 'center',
		textDecoration: 'none',
		fontFamily: fonts.sansSerif,
		fontSize: '14px',
		lineHeight: '18px',
		borderRadius: '21px',
		color: brandColors.logo,
		borderWidth: '1px',
		borderColor: brandColors.logo,
		borderStyle: 'solid'
	},
	socialLinks: {
		margin: '28px auto',
		paddingRight: '7px'
	},
	socialLinkTd: {
		paddingLeft: '7px'
	},
	socialLogo: {
		display: 'block',
		outlineStyle: 'none',
		textDecoration: 'none',
		borderStyle: 'none'
	},
	footerLinks: {
		marginTop: paddings.large,
		textAlign: 'center',
		color: colors.footerText,
		fontSize: footerFontSize
	},
	footerLink: {
		color: brandColors.logo,
		fontSize: footerFontSize,
		textDecoration: 'none'
	},
	copy: {
		marginTop: paddings.small,
		textAlign: 'center',
		color: colors.footerText,
		fontSize: footerFontSize,
		lineHeight: '16px'
	}
});
