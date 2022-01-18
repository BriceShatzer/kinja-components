/* @flow */

/**
 * NOTE: These types are duplicated in mantle, please update there as well.
 * (public/javascripts/types/review.es6)
 */

import type { Image } from '../types';

export type TypedTagValue = {
  valueCanonical: string,
  valueDisplay: string
};

export type TypedTag = {
	id?: number,
	canonicalName: string,
	displayName: string,
	image?: Image,
	description?: string,
	newlyCreated?: boolean
};

export type StoryType = {
	id: number
};

// As received from the server. We handle them as strings only.
export type Category = {
	canonicalName: string,
	displayName: string,
	id: string,
	storyTypeId: string,
	parentId?: string
};
