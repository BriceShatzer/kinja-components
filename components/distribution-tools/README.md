# DistributionTools ![ready](status-images/ready.svg)

Distribution Tools is a Kinja-specific component built to be used in the Editor to fill in the SEO Title (Head Title Tag), the social image and social sharing fields.

<!-- STORY -->

## Props

```
type Props = {
	spliceToBlogHomePage: boolean,
	hideFromRSS: boolean,
	spliceToBlogHomePage: boolean,
	shouldAutoSpliceToParent: boolean,
	showInRss: boolean,
	headerTitleTag: boolean,
	socialShareSettings: boolean,
	sharingMainImage: ImageType,
	mainTitle: string,
	socialDescription: string,
	externalAPI: {
		imageUploader: (target: string | File) => Promise<*>,
		updatePostModel: (*) => void
	}
};

type State = {
	headTitleTag: string,
	shareTitle: string,
	socialDescription: string,
	showInRss: boolean,
	spliceToBlogHomePage: boolean,
	isImageModalOpen: boolean,
	sharingMainImage: ImageType
};
```
