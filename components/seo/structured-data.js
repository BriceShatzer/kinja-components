// @flow
/* eslint-disable flowtype/no-types-missing-file-annotation, react/prop-types */
import * as React from 'react';

import FormattedTime from 'kinja-magma/models/FormattedTime';
import imageUrl from 'kinja-images/imageUrl';
import imageSizes from 'kinja-images/config/image-sizes';
import renderPlainText from 'postbody/utils/renderPlainText';

import ImageNode from 'postbody/blockNodes/ImageNode';

import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type User from 'kinja-magma/models/User';
import type Image from 'kinja-magma/models/Image';
import { type VideoMeta } from 'kinja-magma/models/VideoMeta';
import type HeadlineImage from 'kinja-magma/models/HeadlineImage';
import type CategoryStreamSection from 'kinja-magma/models/CategoryStreamSection';

import type {
	Organization,
	ImageObject,
	ListItem,
	WebPage,
	Person,
	VideoObject
} from './structured-data-models';

const typeTemplateOrganization = (name: string, url: string, logo: ?string, socialLinks: Array<string>): Organization => ({
	'@type': 'Organization',
	'@context': 'http://schema.org',
	name,
	url,
	...(logo ? { logo: {
		'@type': 'ImageObject',
		width: 500,
		url: logo
	}} : null),
	sameAs: socialLinks
});

const typeTemplateImage = (image: ImageNode | Image | HeadlineImage, transformName): ImageObject => {
	const transform = imageSizes[transformName];
	const thumbnailTransform = imageSizes.KinjaCenteredMediumAutoFrozen;
	const caption = (image instanceof ImageNode) ? { caption: renderPlainText(image.toJSON().caption) } : null;

	return {
		'@type': 'ImageObject',
		height: transform.height,
		width: transform.width,
		url: imageUrl(image.id, transformName, image.format),
		thumbnail: {
			'@type': 'ImageObject',
			height: thumbnailTransform.height,
			width: thumbnailTransform.width,
			url: imageUrl(image.id, 'KinjaCenteredMediumAutoFrozen', image.format)
		},
		...caption
	};
};

const typeTemplateVideo = (videos: Array<VideoMeta>, displayName: string): Array<VideoObject> => {
	const toVideoObject = (video: VideoMeta): VideoObject => {
		let { description } = video;
		// Some videos have a description that is not exactly an empty string but a string with a space.
		if (typeof description === 'string') {
			description = description.trim();
		}
		return {
			'@type': 'VideoObject',
			'@context': 'https://schema.org',
			name: video.title,
			contentUrl: video.streamingUrl ? video.streamingUrl : undefined,
			description: description || `${displayName} Video`,
			duration: video.duration ? `PT${video.duration.toString()}S` : undefined,
			thumbnailUrl: video.poster
				? [
					imageUrl(
						video.poster.id,
						'KinjaUncroppedExtraLargeAuto',
						video.poster.format
					)
				]
				: undefined,
			uploadDate: video.publishedTimestamp || ''
		};
	};

	return videos.map(toVideoObject);
};

const typeTemplatePerson = (name: string): Person => ({
	'@type': 'Person',
	name
});

const typeTemplateListItem = (position: number, url: string): ListItem => ({
	'@type': 'ListItem',
	position,
	url
});

const typeTemplateCollectionPage = (name: string, orgUrl: string, logo: ?string, socialLinks: Array<string>): WebPage => ({
	'@type': ['CollectionPage', 'ItemList'],
	'@context': 'http://schema.org',
	publisher: typeTemplateOrganization(name, orgUrl, logo, socialLinks)
});

const typeTemplateSearchResultsPage = (name: string, orgUrl: string, logo: ?string, socialLinks: Array<string>): WebPage => ({
	'@type': ['SearchResultsPage', 'ItemList'],
	'@context': 'http://schema.org',
	publisher: typeTemplateOrganization(name, orgUrl, logo, socialLinks)
});

/*
	Just an LD+JSON script tag as a component.
	Using this is optional, because you might run into situations where structured data content
	has to be provided as a string, e.g. within a component that has issues taking child
	components.
*/
export function LdJson({ contents }: { contents: string }): React.Element<'script'> {
	return (
		<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: contents }}/>
	);
}

/*
	Below are a collection of functions that return stringified structured data.
	Create one for each content type/page, or whatever that requires marking up.
*/
type BlogMainPageProps = {
	name: string,
	logo: ?string,
	orgUrl: string,
	socialLinks: Array<string>
};
export function forBlogMainPage({
	name,
	logo,
	orgUrl,
	socialLinks
}: BlogMainPageProps): string {
	return JSON.stringify(typeTemplateOrganization(name, orgUrl, logo, socialLinks));
}

// structured data for stream pages
type StreamPageProps = {
	name: string,
	logo: ?string,
	posts: Array<Post>,
	orgUrl: string,
	headline: string,
	socialLinks?: Array<string>
};
export function forStream({
	name,
	logo,
	posts,
	orgUrl,
	headline,
	socialLinks = []
}: StreamPageProps): string {
	const webPageJson = typeTemplateCollectionPage(name, orgUrl, logo, socialLinks);
	const data = {
		...webPageJson,
		headline,
		itemListElement: posts.map((post, index) => typeTemplateListItem(index + 1, post.securePermalink))
	};

	return JSON.stringify(data);
}

type SectionedStreamPageProps = {
	name: string,
	logo: ?string,
	orgUrl: string,
	headline: string,
	socialLinks?: Array<string>,
	sectionItems: Array<CategoryStreamSection>
};
export function forSectionedStream({
	name,
	logo,
	orgUrl,
	headline,
	socialLinks = [],
	sectionItems
}: SectionedStreamPageProps): string {
	const webPageJson = typeTemplateCollectionPage(name, orgUrl, logo, socialLinks);
	const data = {
		...webPageJson,
		headline,
		itemListElement: sectionItems.reduce((listItems, section) => listItems.concat(
			section.posts.map((post, index) => typeTemplateListItem(listItems.length + index + 1, post.securePermalink)))
		, [])
	};

	return JSON.stringify(data);
}

export function forSearchResultStream({
	name,
	logo,
	posts,
	orgUrl,
	headline,
	socialLinks = []
}: StreamPageProps): string {
	const webPageJson = typeTemplateSearchResultsPage(name, orgUrl, logo, socialLinks);
	const data = {
		...webPageJson,
		headline,
		itemListElement: posts.map((post, index) => typeTemplateListItem(index + 1, post.securePermalink))
	};

	return JSON.stringify(data);
}

type PermalinkPageProps = {
	blog: Blog,
	post: Post,
	authors: Array<User>,
	socialLinks: Array<string>,
	videos?: VideoMeta | Array<VideoMeta>
};
export function blogPermalinkPage({
	blog,
	post,
	authors,
	socialLinks,
	videos
}: PermalinkPageProps): string {
	const transformName = 'CenteredWideExtraBigAutoFrozen';

	const datePublished = new FormattedTime({
		timestamp: Number(post.publishTimeMillis),
		timezone: blog.timezone,
		locale: blog.locale
	}).yMdHmsZ;
	const dateModified = new FormattedTime({
		timestamp: Number(post.lastUpdateTimeMillis),
		timezone: blog.timezone,
		locale: blog.locale
	}).yMdHmsZ;
	const author = post.showByline && post.byline !== '' ?
		typeTemplatePerson(post.byline) :
		authors.map(author => typeTemplatePerson(author.displayName));
	const image = [post.sharingMainImage, ...post.images].find(image => image);
	const keywords = post.tags.map(tag => tag.safeName);

	let videosMetaArray;
	if (videos) {
		videosMetaArray = Array.isArray(videos) ? videos : [videos];
	}

	const data = {
		'@type': 'Article',
		'@context': 'http://schema.org',
		url: post.permalink,
		author,
		headline: post.headline ? post.strippedHeadline.substring(0, 110) : '',
		description: post.socialDescription || post.plainTextExcerpt,
		datePublished,
		dateModified,
		mainEntityOfPage: {
			'@type': 'WebPage',
			url: post.permalink
		},
		image: image ? typeTemplateImage(image, transformName) : undefined,
		articleBody: post.plainText,
		articleSection: (post.storyType && post.storyType.title) || (keywords && keywords[0]),
		keywords,
		publisher: typeTemplateOrganization(
			blog.displayName, `https://${blog.canonicalHost}`, blog.properties.logoLink, socialLinks
		),
		video: videosMetaArray && typeTemplateVideo(videosMetaArray, blog.displayName)
	};
	return JSON.stringify(data);
}

type PersonProps = {
	image: string,
	name: string,
	alternateName: string,
	twitterHandle: ?string,
	email: ?string
};
export function person({
	image,
	name,
	alternateName,
	twitterHandle,
	email
}: PersonProps): string {
	const sameAs = twitterHandle ? [`https://twitter.com/${twitterHandle}`] : undefined;

	return JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		image,
		name,
		alternateName,
		sameAs,
		email: email || undefined
	});
}
