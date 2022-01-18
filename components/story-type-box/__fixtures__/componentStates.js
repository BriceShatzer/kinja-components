/* @flow */

import type { StoryTypeBoxProps } from '../story-type-box';

type ComponentStates = {
    [string]: {
        name: string,
        props: StoryTypeBoxProps
    }
}

export const componentStates: ComponentStates = {
	textOnly: {
		name: 'Text only',
		props: {
			title: 'Ali\'s Top Reviews',
			description: 'This a page dedicated to everything that Ali loves the most in life.'
		}
	},
	textAndImage: {
		name: 'Text and image',
		props: {
			title: 'Ali\'s Top Reviews',
			description: 'This a page dedicated to everything that Ali loves the most in life.',
			image: {
				id: 'dvgmz3utpyl8fhivjejt',
				format: 'jpg'
			}
		}
	},
	textImageAndLabel: {
		name: 'Text, image and label',
		props: {
			title: 'Dogs',
			description: 'All About Good Doggos.',
			image: {
				id: 'cclianporp7wwg829w3g',
				format: 'jpg'
			},
			label: 'Ali\'s Top Reviews'
		}
	},
	titleAndImage: {
		name: 'Title and image',
		props: {
			title: 'Ali\'s Top Reviews',
			image: {
				id: 'dvgmz3utpyl8fhivjejt',
				format: 'jpg'
			}
		}
	},
	titleAndCategoryLabel: {
		name: 'Title and category label',
		props: {
			label: 'Ali\'s Top Reviews',
			title: 'Dogs'
		}
	}
};
