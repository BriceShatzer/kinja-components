// @flow

type ContentTypeProps = {
	pageType?: ?string,
	isPostVideo?: boolean,
	isPostFeatured?: boolean,
	isPostSponsored?: boolean,
	isNewLatestPage?: boolean
};

export default function getPlayerContentType({
	pageType,
	isPostVideo,
	isPostFeatured,
	isPostSponsored,
	isNewLatestPage
}: ContentTypeProps): string {
	if (!pageType || pageType === 'permalink') {
		if (isPostVideo) {
			return 'video';
		} else if (isPostFeatured) {
			return 'featured';
		} else if (isPostSponsored) {
			return 'sponsored-article';
		}
		return 'article';
	} else if (pageType === 'frontpage' && isNewLatestPage) {
		return 'latest';
	} else {
		return pageType;
	}
}
