// @flow
import trimExcerpt from 'postbody/utils/trimExcerpt';
import { parseNode } from 'postbody/BlockNode';
import Paragraph from 'postbody/blockNodes/Paragraph';
import { LinkNodeWithAnalytics, TextNode, LinkNode } from 'postbody/InlineNode';
import { paragraphLength } from 'postbody/utils/paragraphLength';
import type { BlockNode } from 'postbody/BlockNode';
import type Post from 'kinja-magma/models/Post';

export function appendReadMoreLink(node: Paragraph, url: string, gaEvent?: Array<Array<string | { [string]: mixed }>>): Paragraph {
	const linkNode = gaEvent ? new LinkNodeWithAnalytics(
		[new TextNode('Read more')],
		url,
		gaEvent
	) : new LinkNode([new TextNode('Read more')], url);
	return new Paragraph([
		...node.value,
		new TextNode(' '),
		linkNode
	]);
}

export function getTruncatedExcerpt(post: Post): Array<BlockNode> {
	return post.firstParagraph ? trimExcerpt([parseNode(post.firstParagraph)], 320) : [];
}

export default function calculateExcerptWithReadMore(post: Post, indexInStream: number): Array<BlockNode> {
	const excerpt = getTruncatedExcerpt(post);
	const excerptParagraph = excerpt[0] && excerpt[0] instanceof Paragraph ? excerpt[0] : null;
	const firstParagraph: ?Paragraph = (post.firstParagraph && post.firstParagraph.type === 'Paragraph') ? Paragraph.fromJSON(post.firstParagraph) : null;
	const isExcerptTruncated = excerptParagraph && firstParagraph ? paragraphLength(excerptParagraph) < paragraphLength(firstParagraph) : false;
	const postHasMoreContent = post.body && post.body.length > 1;
	const excerptWithReadMore: Array<BlockNode> =
		(isExcerptTruncated || postHasMoreContent) && !post.leftOfHeadline && !post.aboveHeadline && !post.headline ? excerpt.map((node, i) => {
			if (node.type === 'Paragraph' && i === 0) {
				return appendReadMoreLink(
					node,
					post.securePermalink,
					[['Front page click', `stream post click - ${indexInStream}`, post.securePermalink, {metric19: 1}]]
				);
			}
			return node;
		}) : excerpt;
	return excerptWithReadMore;
}