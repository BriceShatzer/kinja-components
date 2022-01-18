/* @flow */

import * as React from 'react';
import DeletedEmbed from './deleted-embed-placeholder';
import IframeUnsupported from './iframe-unsupported';
import type { DeletedReason } from 'postbody/blockNodes/DeletedEmbed';
import type { BlockNodeJSON } from 'postbody/BlockNode';

type Props = {
	originalContent: BlockNodeJSON,
	reason: ?DeletedReason
};

/**
 * Image case is not the same in the editor as on the permalink page.
 */
const DeletedEmbedContent = ({ originalContent }: { originalContent: BlockNodeJSON }) => {
	switch (originalContent.type) {
		case 'Image':
		case 'FullBleedWidget':
			return (
				<IframeUnsupported>
					This {originalContent.type} was removed because its copyright status is questionable.
					If you are certain you own the rights to this image, you can <a href="#" className="js_restore-image">restore it</a>.
				</IframeUnsupported>
			);
		default:
			return <DeletedEmbed originalContent={originalContent} />;
	}
};

/**
 * Renders a deleted embed placeholder for display in the editor
 */
function DeletedEmbedInEditor(props: Props): React$Node {

	const {originalContent, reason} = props;

	return (
		<aside
			contentEditable={false}
			className='deleted-embed'
			data-original-content={JSON.stringify(originalContent)}
			data-reason={reason}
		>
			<DeletedEmbedContent originalContent={originalContent} />
		</aside>
	);

}

export default DeletedEmbedInEditor;
