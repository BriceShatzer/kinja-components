// @flow

import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';

export function isLargeOnStream(post: Post, blog?: Blog, repostBlog?: ?Blog, simpleEmbiggen?: boolean) {
	// We don't want to show splices from theinventory as embiggened on non partnerEditorial blogs.
	// Because: The Inventory want to embiggen their content but their articles need to be compact when spliced across the network.
	const defaultBlogRecircGroup = repostBlog && repostBlog.properties && repostBlog.properties.recircGroup;
	const notSharedFromPartnerEditorial = blog && (defaultBlogRecircGroup !== 'partnerEditorial' || defaultBlogRecircGroup === blog.recircGroup);
	const canBeEmbiggened = notSharedFromPartnerEditorial;

	if (simpleEmbiggen) {
		return canBeEmbiggened && (post.parsedFeaturedMedia || post.isEmbiggened || Boolean(post.blipEmbed));
	}

	const hasAboveHeadline = Boolean(post.aboveHeadline);
	const showLargeMedia = hasAboveHeadline || post.isEmbiggened || Boolean(post.blipEmbed);

	return canBeEmbiggened && showLargeMedia;
}
