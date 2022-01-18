// @flow

import * as React from 'react';

import Blog from 'kinja-magma/models/Blog';
import WhiteBlogLogoImg from '../blog-logo/blog-logo-white-img';
import { StylesContext } from './email-styles';

const logoDir = '/assets/images/logos/newsletter/';

export const isNewsletterEnabled = (blog: Blog): boolean =>
	blog.properties && blog.properties.newsletter ? blog.properties.newsletter : false;

/**
 * Removes leading tabs and spaces and first and last empty lines.
 */
export const stripMargin = (s: string): string =>
	s.replace(/^[\t ]+/gm, '').replace(/^\n/, '').replace(/\n$/, '');

/**
 * The list of template vars supported by Kinja.
 * See https://github.com/gawkermedia/kinja-subscriptions/blob/master/app/models/TemplateVar.scala
 */
type TemplateVar =
	'NewsletterId' |
	'NewsletterName' |
	'NewsletterTitle' |
	'SubscriberEmail' |
	'SubscriptionToken';

/**
 * See https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-personalized-email-api.html
 */
export const templateVar = (name: TemplateVar): string => `{{${name}}}`;

/**
 * Returns the subscription confirmation URL for a blog.
 */
export const confirmUrl = (blog: Blog): string =>
	`https://${blog.canonicalHost}/newsletter/confirm?subscriptionToken=${templateVar('SubscriptionToken')}`;

/**
 * Returns the unsubscribe URL for a blog.
 */
export const unsubscribeUrl = (blog: Blog): string =>
	`https://${blog.canonicalHost}/newsletter/unsubscribe?subscriptionToken=${templateVar('SubscriptionToken')}`;

export const termsOfUseUrl = 'https://legal-supplemental.kinja.com/kinja-terms-of-use-1793094100';

export const privacyPolicyUrl = 'https://legal-supplemental.kinja.com/privacy-policy-1793094625';

type Children = {
	children: React.Node
};

export const Email = ({
	title,
	children
}: {
	title: string
} & Children): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<html lang='en'>
				<head>
					<meta charSet='UTF-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1.0' />
					<meta name='ROBOTS' content='NOINDEX,NOFOLLOW' />
					<title>{title}</title>
				</head>
				<body style={styles.body}>
					<div style={styles.wrapper}>
						{children}
					</div>
				</body>
			</html>
		}
	</StylesContext.Consumer>;

export const Header = ({
	blog,
	subtitle,
	staticHost
}: {
	blog: Blog,
	subtitle: string,
	staticHost: string
}): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<table style={styles.header} cellSpacing='0' cellPadding='0' border='0'>
				<tr>
					<td style={styles.bloglogoTd}>
						<WhiteBlogLogoImg
							name={blog.blogGroup}
							alt={blog.displayName}
							staticHost={staticHost}
							style={styles.bloglogo}
						/>
					</td>
					<td style={styles.subtitle}>{subtitle}</td>
				</tr>
			</table>
		}
	</StylesContext.Consumer>;

export const Heading1 = ({
	link,
	children
}: {
	link?: string
} & Children): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<React.Fragment>
				{link &&
					<a href={link} style={styles.heading1Link} target='_blank' rel='noopener noreferrer'>
						<h1 style={styles.heading1}>
							{children}
						</h1>
					</a>
				}
				{!link &&
					<h1 style={styles.heading1}>
						{children}
					</h1>
				}
			</React.Fragment>
		}
	</StylesContext.Consumer>;

export const LeadImage = ({
	link,
	src
}: {
	link: string,
	src: string
}): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<a href={link} target='_blank' rel='noopener noreferrer'>
				<img src={src} style={styles.leadImage} />
			</a>
		}
	</StylesContext.Consumer>;

export const LeadText = ({children}: Children): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<p style={styles.leadText}>
				{children}
			</p>
		}
	</StylesContext.Consumer>;

export const Message = ({children}: Children): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<p style={styles.message}>
				{children}
			</p>
		}
	</StylesContext.Consumer>;

export const Button = ({
	link,
	label,
	style
}: {
	link: string,
	label: string,
	style: {[string]: string}
}): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<a href={link} style={{...styles.button, ...style}}>{label}</a>
		}
	</StylesContext.Consumer>;

export const VisitSiteButton = ({blog}: {blog: Blog}): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<div style={styles.visitSiteButtonWrapper}>
				<a href={`https://${blog.canonicalHost}/`} style={styles.visitSiteButton}>Visit {blog.displayName}</a>
			</div>
		}
	</StylesContext.Consumer>;

export const Footer = ({children}: Children): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<div style={styles.footer}>
				{children}
			</div>
		}
	</StylesContext.Consumer>;

const SocialLinkTd = ({
	url,
	logoUrl
}: {
	url: string,
	logoUrl: string
}): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<td style={styles.socialLinkTd}>
				<a href={url} target='_blank' rel='noopener noreferrer'>
					<img src={logoUrl} width='30' height='30' border='0' style={styles.socialLogo}/>
				</a>
			</td>
		}
	</StylesContext.Consumer>;

export const SocialLinks = ({
	blog,
	staticHost
}: {
	blog: Blog,
	staticHost: string
}): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<table style={styles.socialLinks} cellSpacing='0' cellPadding='0' border='0'>
				<tr>
					{blog.facebookScreenName && <SocialLinkTd
						url={`https://facebook.com/${blog.facebookScreenName}`}
						logoUrl={`${staticHost}${logoDir}social-f.png`}
					/>}
					{blog.twitterScreenName && <SocialLinkTd
						url={`https://twitter.com/${blog.twitterScreenName.replace(/^@/, '')}`}
						logoUrl={`${staticHost}${logoDir}social-t.png`}
					/>}
					{blog.instagramScreenName && <SocialLinkTd
						url={`https://instagram.com/${blog.instagramScreenName}/`}
						logoUrl={`${staticHost}${logoDir}social-i.png`}
					/>}
					{blog.youtubeUrl && <SocialLinkTd
						url={blog.youtubeUrl}
						logoUrl={`${staticHost}${logoDir}social-y.png`}
					/>}
				</tr>
			</table>
		}
	</StylesContext.Consumer>;

export const FooterLinks = ({blog}: {blog: Blog}): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<div style={styles.footerLinks}>
				<a href={termsOfUseUrl} target='_blank' rel='noopener noreferrer' style={styles.footerLink}>Terms of Use</a>&nbsp;|&nbsp;
				<a href={privacyPolicyUrl} target='_blank' rel='noopener noreferrer' style={styles.footerLink}>Privacy Policy</a>&nbsp;|&nbsp;
				<a href={unsubscribeUrl(blog)} target='_blank' rel='noopener noreferrer' style={styles.footerLink}>Unsubscribe</a>
			</div>
		}
	</StylesContext.Consumer>;

export const FooterLinksPlaintext = '';

const copyright = `© ${new Date().getFullYear()} G/O Media`;
const address1 = '1540 Broadway, 27th Floor';
const address2 = 'New York, NY 10036';

export const Copy = (): React.Node =>
	<StylesContext.Consumer>
		{styles =>
			<div style={styles.copy}>
				{copyright}<br/>
				{address1}<br/>
				{address2}
			</div>
		}
	</StylesContext.Consumer>;

export const CopyPlaintext = `
	${copyright}
	${address1}
	${address2}
`;
