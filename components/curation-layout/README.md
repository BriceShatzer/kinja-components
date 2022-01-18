# Curation Layout ![under-review](status-images/under-review.svg)

Curation Layout component is the main controller of the curation module that holds all the state altering methods (zones draggingg, item swapping, image changing, headline/excerpt changing, item replacement) and grid and layout configurations.

<!-- STORY -->

## Props

```
type Props = {
	withControls: boolean,
	children: any,
	gridConfig: GridConfig,
	defaultLayouts: CurationDefaultLayouts,
	externalAPI: CurationExternalAPI,
	resolveItem: (itemId: ?number) => Promise<*>,
	isSaving: boolean,
	isEditMode: boolean,
	saveHandler: (isSaving: boolean, isEditing: boolean) => void
};

type State = {
	gridConfig: GridConfig,
	toolbarItems: Array<*>,
	isSaving: boolean,
	isEditMode: boolean
};

type CardState = {
	cardState: {
		headline?: {
			prev: string,
			next: string
		},
		excerpt?: {
			prev: string,
			next: string
		}
	},
	isEditing?: boolean,
	isEditMode?: boolean,
	isImageModalOpen?: boolean
};
```
