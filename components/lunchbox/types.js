/* @flow */

import { LinkNode } from 'postbody/InlineNode';
import type { LunchboxLayoutType } from 'kinja-magma/models/LunchboxLayoutGroup';
import type { BlogId } from 'kinja-magma/models/Id';

export type LunchboxEditorEventHandlers = {
	handleUpdateHeader: (props: { headerText: string }) => void,
	handleUpdateParagraph: (props: { paragraphText: string }) => void,
	handleUpdateLayout: (props: { currentLayout: LunchboxLayoutType }) => void,
	handleMediaUpload: () => void,
	deleteImage: () => void
};

export type LunchboxLinkProps = {
	link: LinkNode,
	blogId?: ?BlogId
};
