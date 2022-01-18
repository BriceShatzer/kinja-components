/* @flow */

export type StoryType = {
	id: string,
	title: string,
	canonical: string,
	count: number,
	featured?: boolean
};

export type Tag = {
	displayName: string,
	canonical: string,
	count: number,
	featured?: boolean
};

export type FilterType = {
	title: string,
	canonical: string,
	type: string
};
