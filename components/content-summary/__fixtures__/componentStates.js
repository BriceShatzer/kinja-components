/* @flow */

import type { SummaryProps } from '../content-summary';
import { createTypedTagDataId } from 'kinja-magma/models/Id';
import SimpleImage from 'kinja-magma/models/SimpleImage';

type ComponentStates = {
	[string]: {
		name: string,
		props: SummaryProps
	}
}

const defaultSummary = `
Are you a server's worst nightmare without even knowing it? We're here to help.
[The Salty Waitress](//thetakeout.com/c/the-salty-waitress) is The Takeout's advice column from a real-life waitress that
will teach you how not to behave like a garbage person while dining out—and maybe
in real life.
`;

const image = new SimpleImage({
	id: 'vwppylx89l4ubmp3xcjc',
	format: 'jpg'
});

export const componentStates: ComponentStates = {
	storyTypeBoilerplateWithoutImage: {
		name: 'Story Type Boilerplate',
		props: {
			title: 'The Salty Waitress',
			summary: defaultSummary,
			blogId: 4,
			canonical: 'the-salty-waitress',
			canonicalHost: 'thetakeout.com',
			contentType: 'Standard',
			category: null,
			ga: () => {}
		}
	},
	storyTypeBoilerplateWithImage: {
		name: 'Story Type Boilerplate w/ Image',
		props: {
			title: 'The Salty Waitress',
			image,
			summary: defaultSummary,
			blogId: 4,
			canonical: 'the-salty-waitress',
			canonicalHost: 'thetakeout.com',
			contentType: 'Standard',
			category: null,
			ga: () => {}
		}
	},
	storyTypeBoilerplateWithImageAndOnlyPrev: {
		name: 'Story Type Boilerplate w/ Image & Previous Pagination',
		props: {
			title: 'The Salty Waitress',
			image,
			summary: defaultSummary,
			blogId: 4,
			canonical: 'the-salty-waitress',
			canonicalHost: 'thetakeout.com',
			contentType: 'Standard',
			prevPermalink: 'https://tv.avclub.com/the-expanse-slows-down-and-looks-to-the-past-1826634833',
			category: null,
			ga: () => {}
		}
	},
	storyTypeBoilerplateWithImageWithPagination: {
		name: 'Story Type Boilerplate w/ Image & w/ Pagination',
		props: {
			title: 'The Salty Waitress',
			image,
			summary: defaultSummary,
			blogId: 4,
			canonical: 'the-salty-waitress',
			canonicalHost: 'thetakeout.com',
			contentType: 'Standard',
			nextPermalink: 'https://tv.avclub.com/the-expanse-slows-down-and-looks-to-the-past-1826634833',
			prevPermalink: 'https://tv.avclub.com/the-expanse-slows-down-and-looks-to-the-past-1826634833',
			category: null,
			ga: () => {}
		}
	},
	storyTypeBoilerplateWithImageWithNonStandardContentType: {
		name: 'Story Type Boilerplate w/ Image & w/ Non-Standard Content Type',
		props: {
			title: 'The Salty Waitress',
			image,
			summary: defaultSummary,
			blogId: 4,
			canonical: 'the-salty-waitress',
			canonicalHost: 'thetakeout.com',
			contentType: 'Video',
			category: {
				canonicalName: 'reviews',
				valueDisplay: 'Reviews',
				id: createTypedTagDataId(0)
			},
			nextPermalink: 'https://tv.avclub.com/the-expanse-slows-down-and-looks-to-the-past-1826634833',
			prevPermalink: 'https://tv.avclub.com/the-expanse-slows-down-and-looks-to-the-past-1826634833',
			ga: () => {}
		}
	}
};
