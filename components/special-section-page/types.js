// @flow

import type ImpactHeader from 'postbody/blockNodes/ImpactHeader';
import type Blog from 'kinja-magma/models/Blog';
import type { BlogId } from 'kinja-magma/models/Id';
import type Post from 'kinja-magma/models/Post';
import type Lunchbox from 'kinja-magma/models/Lunchbox';

export type ModalProps = {
	onClose: () => void,
	isOpen: boolean
};

export type SpecialSectionProps = {
	impactHeader: ?ImpactHeader,
	blog: ?Blog,
	customContent?: Array<Lunchbox>,
	editorialPosts?: Array<Post>,
	editorialSectionHeading?: string,
	adsEnabled: boolean,
	domainBlogId: ?BlogId
};
