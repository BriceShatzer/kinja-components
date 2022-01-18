// @flow

export type ImageObject = {
	'@type': 'ImageObject',
	width?: number,
	height?: number,
	url: string,
	thumbnail?: ImageObject
};

export type Organization = {|
	'@type': 'Organization',
	'@context': 'http://schema.org',
	logo?: ImageObject,
	url: string,
	sameAs: Array<string>,
	name: string
|};

export type WebPage = {
	'@type': Array<string>,
	'@context': 'http://schema.org',
	publisher: Organization
};

export type Person = {
	'@type': 'Person',
	name: string
};

export type ListItem = {
	'@type': 'ListItem',
	position: number,
	url: string
}

export type VideoObject = {
	'@type': 'VideoObject',
	'@context': 'https://schema.org',
	name: string,
	description: string,
	thumbnailUrl?: Array<string>,
	uploadDate: string,
	duration?: string,
	contentUrl?: string,
	embedUrl?: string,
	interactionStatistic?: {
		'@type': 'InteractionCounter',
		interactionType: {
			'@type': 'http://schema.org/WatchAction'
		},
		userInteractionCount: number
	}
}
