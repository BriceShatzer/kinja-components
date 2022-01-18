/* @flow */

import type { PostId, BlogId } from 'kinja-magma/models/Id';
import Image from 'kinja-magma/models/Image';

export type FauxPost = {
	id: PostId,
	defaultBlogId: BlogId,
	+permalink?: string,
	+securePermalink?: string,
	headline: ?string,
	images: Array<Image>,
	isFaux: boolean,
	+defaultBlogGroup?: ?string,
	+sharingMainImage?: ?Image,
	+customSharingMainImage?: ?Image,
	isInvalid?: boolean,
	errorMessage?: string
};

export type ExternalAPI = {
	resolveItem: (url: string) => Promise<*>,
	tagSuggestions: (prefix: string) => Promise<*>,
	storySuggestions: (tags: Array<string>, storyTypes: Array<string>) => Promise<*>,
	gaTracking?: () => void
};
