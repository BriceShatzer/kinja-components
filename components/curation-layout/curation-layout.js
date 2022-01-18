/* @flow */
import * as React from 'react';
import classnames from 'classnames';
import layoutToolbarConfig from './layout-toolbar-config';
import ImageModel, { type ImageJSON } from 'kinja-magma/models/Image';
import CurationItem, { type CurationItemProps } from 'kinja-magma/models/CurationItem';
import { isEmpty, cloneDeep } from 'lodash';

import type {
	GridConfig,
	CurationExternalAPI,
	CurationDefaultLayouts,
	Zone,
	LayoutCardinality,
	LayoutGroup,
	CurationLayout
} from '../types';

type Props = {
	children: *,
	gridConfig: GridConfig,
	defaultLayouts: CurationDefaultLayouts,
	externalAPI: CurationExternalAPI,
	isSaving: boolean,
	isCloseButton: boolean,
	isOpenButton: boolean,
	isEditMode: boolean,
	clearCuration: boolean,
	resetToggleState: (isEditMode?: boolean, isSaving?: boolean, isCloseButton?: boolean, isOpenButton?: boolean) => void,
	setActiveCard: (model: CurationItemProps | null, itemIndex?: number, tertiaryIndex?: number) => void
};

type State = {
	gridConfig: GridConfig,
	toolbarItems: *
};

type CardState = {
	cardState: {
		headline?: {
			prev: string,
			next: string,
			tertiaryChildIndex?: number
		},
		excerpt?: {
			prev: string,
			next: string,
			tertiaryChildIndex?: number
		}
	},
	isEditing?: boolean,
	isEditMode?: boolean,
	isImageModalOpen?: boolean
};

const isValidHeadline = (headline: CurationItemProps | string) => {
	const invalidValues = ['Enter title', 'Enter valid title', ''];
	return !invalidValues.includes(headline);
};

class Layout extends React.Component<Props, State> {
	beforeSaveStableState: State
	beforeCloseStableState: State
	constructor(props: Props) {
		super(props);
		const { gridConfig } = this.props;
		if (gridConfig && gridConfig.layout) {
			const existingLayout = gridConfig.layout;
			const initToolbarItems = layoutToolbarConfig(props.defaultLayouts.filter(val => {
				return val.group === existingLayout.group && val.cardinality === existingLayout.cardinality;
			})[0], this.setDefaultLayout);

			this.state = {
				gridConfig,
				toolbarItems: initToolbarItems
			};

		} else {
			this.state = this.getInitState();
		}

		this.beforeSaveStableState = cloneDeep(this.state);
	}
	updateOverhangWrapper = () => {
		const header = document.querySelector('.overhang-wrapper');
		if (header) {
			if (this.state &&
				this.state.gridConfig &&
				this.state.gridConfig.layout &&
				this.state.gridConfig.layout.cardinality > 1) {
				header.classList.add('hangable-curation');
			} else {
				header.classList.remove('hangable-curation');
			}
		}
	}
	componentDidUpdate = () => {
		const { resetToggleState,
			isSaving,
			isCloseButton,
			isOpenButton
		} = this.props;

		if (!this.state) {
			return;
		}

		const gridConfigNotSet = !Object.keys(this.state.gridConfig).length;

		if (gridConfigNotSet && (!isSaving || !isCloseButton || !isOpenButton)) {
			this.setInitialState();
		}

		if (isSaving) {
			this.onSave();
		}

		if (isCloseButton) {
			if (this.beforeSaveStableState) {
				this.setState(this.beforeSaveStableState);
			}
			resetToggleState();
		}

		if (isOpenButton) {
			if (this.beforeSaveStableState) {
				this.setState(this.beforeSaveStableState);
			}
			resetToggleState(true);
		}

		this.updateOverhangWrapper();
	}

	onSave = () => {
		const { gridConfig } = this.state;

		if (this.props.clearCuration) {
			this.props.externalAPI.deleteLayoutAndItems();
			this.props.resetToggleState();
		}
		if (!gridConfig.layout) {
			return;
		}
		const { cardinality, group } = gridConfig.layout;
		const invalidModel = { isInvalid: true, errorMessage: 'All fields must be populated with a valid post URL' };
		const itemsWithModel = gridConfig.items && gridConfig.items.filter(item => !isEmpty(item) && !item.isInvalid);
		const isModularWithTertiary = cardinality === 4 && group === 'Modular';
		const hasEmptyTertiaryChildren = gridConfig.items && gridConfig.items
			.filter(item => {
				if (item && item.hasChildren && item.items && item.items.length === 4) {
					return item;
				}
			})
			.reduce((acc, current) => {
				return current.items && current.items.filter(item => isEmpty(item) || item.hasOwnProperty('isInvalid'));
			}, []);
		const headlineError = gridConfig.items && gridConfig.items.filter(item => {
			// $FlowFixMe
			return item && !isValidHeadline(item.headline);
		}).length;

		if (cardinality &&
			itemsWithModel &&
			itemsWithModel.length >= cardinality &&
			hasEmptyTertiaryChildren &&
			!hasEmptyTertiaryChildren.length &&
			!headlineError) {
			// Cut off surplus items based on cardinality
			const slicedItems = gridConfig.items && gridConfig.items.slice(0, cardinality);

			// remove children from item if layout is not Modular With Tertiary
			if (!isModularWithTertiary) {
				gridConfig.items = slicedItems && slicedItems.map(item => {
					return item.hasChildren && item.items ? item.items[0] : item;
				});
			} else {
				gridConfig.items = slicedItems;
			}
			this.props.resetToggleState();
			this.beforeSaveStableState = cloneDeep(this.state);
			this.props.externalAPI.saveLayoutAndItems(this.beforeSaveStableState);

		} else {
			const newItems = gridConfig.items && gridConfig.items.map(item => {
				const invalidHeadline = item && !isValidHeadline(item.headline);
				if (isEmpty(item)) {
					return invalidModel;
				} else if (item.hasChildren) {
					item.items = item.items.map(item => isEmpty(item) ? invalidModel : item);
					return item;
				} else if (invalidHeadline) {
					item.invalidTitle = invalidHeadline;
					return item;
				} else {
					return item;
				}
			});

			this.props.resetToggleState(true);
			this.resetItemsState(newItems);
		}
	}

	fillWithEmptyModels = (cardinality: number, existingItems: ?Array<CurationItemProps>): ?Array<CurationItemProps> => {
		if (!cardinality) {
			return;
		}
		const numberOfExistingItems = existingItems && existingItems.length ? existingItems.length : 0;
		const numberOfEmptyItems = cardinality > numberOfExistingItems ? cardinality - numberOfExistingItems : 0;
		const emptyModelsArray = numberOfEmptyItems > 0 ? Array.apply(null, Array(numberOfEmptyItems)).map(() => {
			return {};
		}) : [];

		return existingItems ? existingItems.concat(emptyModelsArray) : [].concat(emptyModelsArray);
	}

	addEmptyItemsToTertiary = (event: SyntheticEvent<HTMLButtonElement>) => {
		if (!event.currentTarget && !(event.currentTarget instanceof HTMLButtonElement)) {
			return;
		}
		const { itemindex, zoneindex, togglemultiple } = event.currentTarget.dataset;
		const { items, layout } = this.state.gridConfig;

		if (!layout || !layout.zones) {
			return;
		}

		const itemsCopied = items && items.slice();
		const editedItemIndex = this.calcEditedItemIndex(layout.zones, Number(zoneindex), Number(itemindex));
		const editedItem = togglemultiple === 'true' ? {
			hasChildren: true,
			headline: 'Enter title',
			items: Array.apply(null, Array(4)).map(() => {
				return {};
			})
		} : {};
		if (itemsCopied) {
			itemsCopied[editedItemIndex] = editedItem;
			this.resetItemsState(itemsCopied);
		}

		// curation analytics
		const eventLabel = togglemultiple === 'true' ? 'Tertiary list' : 'Tertiary standard';
		window.ga && window.ga('send', 'event', 'Curation Tools', 'Curation Module - Change Tertiary Layout', eventLabel);
	}

	getInitState = () => {
		const { defaultLayouts } = this.props;
		const defaultLayout = defaultLayouts.filter(layout => layout.group === 'Headline')[0];
		return {
			gridConfig: {
				layout: defaultLayout,
				items: this.fillWithEmptyModels(defaultLayout.cardinality, [])
			},
			toolbarItems: layoutToolbarConfig(defaultLayout, this.setDefaultLayout)
		};
	}

	setInitialState = () => {
		const initState = this.getInitState();
		this.setState(initState);
	}

	setDefaultLayout = (event: Event, options: CurationLayout) => {
		const { defaultLayouts, gridConfig } = this.props;
		const updatedLayout = defaultLayouts.filter(cv => cv.group === options.group && cv.cardinality === options.cardinality)[0];
		const { zones, group, cardinality } = updatedLayout;

		const items = gridConfig.items || this.state.gridConfig.items
			? this.fillWithEmptyModels(updatedLayout.cardinality, this.state.gridConfig.items)
			: this.fillWithEmptyModels(updatedLayout.cardinality, []);

		this.setState({
			gridConfig: {
				layout: {
					cardinality,
					group,
					zones
				},
				items
			},
			toolbarItems: layoutToolbarConfig(options, this.setDefaultLayout)
		});
		// curation analytics
		if (window.ga && updatedLayout && cardinality) {
			window.ga('send', 'event', 'Curation Tools', 'Curation Module - Change Layout', `${updatedLayout.group} - ${cardinality} units`);
		}

	}

	setCardSwapState = (draggedItemIndex: number, draggedZoneIndex: number, droppedItemIndex: number, droppedZoneIndex: number) => {
		const { items, layout } = this.state.gridConfig;
		if (!layout) {
			return;
		}
		const clonedItems = cloneDeep(items);
		const draggedItemArrayIndex = this.calcEditedItemIndex(layout.zones, Number(draggedZoneIndex), Number(draggedItemIndex));
		const droppedItemArrayIndex = this.calcEditedItemIndex(layout.zones, Number(droppedZoneIndex), Number(droppedItemIndex));
		const isDroppedZoneTertiary = (
			layout.zones[droppedZoneIndex] &&
			layout.zones[droppedZoneIndex].numberOfItems === 1 &&
			layout.zones[droppedZoneIndex].dimension === '1fr');
		// $FlowFixMe
		const isDraggedItemTertiaryWithChildren = clonedItems[draggedItemArrayIndex].hasChildren;

		if (isDraggedItemTertiaryWithChildren && !isDroppedZoneTertiary) {
			// $FlowFixMe
			clonedItems[draggedItemArrayIndex] = clonedItems[draggedItemArrayIndex].items[0];
		}

		// $FlowFixMe
		[clonedItems[draggedItemArrayIndex], clonedItems[droppedItemArrayIndex]]
			// $FlowFixMe
			= [clonedItems[droppedItemArrayIndex], clonedItems[draggedItemArrayIndex]];

		if (clonedItems) {
			this.resetItemsState(clonedItems);
		}

		// curation analytics
		window.ga && window.ga('send', 'event', 'Curation Tools', 'Curation Module - Article Position Change');
	}

	setLayout = (draggedZoneIndex: number, replacedZoneIndex: number) => {
		this.setState(prevState => {
			const gridConfig = prevState.gridConfig;
			if (!gridConfig.layout) {
				return;
			}
			const { zones, group, cardinality } = gridConfig.layout;
			const items = gridConfig.items && gridConfig.items.slice();
			const itemsEncapsulated = [];

			zones.forEach(zone => {
				// $FlowFixMe
				itemsEncapsulated.push(items.splice(0, zone.numberOfItems));
			});

			/* replacing zones & items */
			// $FlowFixMe
			[zones[draggedZoneIndex], zones[replacedZoneIndex]] = [zones[replacedZoneIndex], zones[draggedZoneIndex]];
			// $FlowFixMe
			[itemsEncapsulated[draggedZoneIndex], itemsEncapsulated[replacedZoneIndex]]
				// $FlowFixMe
				= [itemsEncapsulated[replacedZoneIndex], itemsEncapsulated[draggedZoneIndex]];

			return {
				...prevState,
				gridConfig: {
					layout: {
						cardinality,
						group,
						zones
					},
					items: [].concat(...itemsEncapsulated)
				}
			};
		});

		// curation analytics
		window.ga && window.ga('send', 'event', 'Curation Tools', 'Curation Module - Column Position Change');
	}

	calcEditedItemIndex(zones: Array<Zone>, zoneindex: number, itemIndex: number) {
		return zones.reduce((acc, zone, index) => {
			return index < zoneindex ? acc + zone.numberOfItems : acc;
		}, 0) + itemIndex;
	}

	returnEditedItems = (zoneindex: number, itemIndex: number, newValue?: CurationItemProps | string, property?: string, tertiaryIndex?: number) => {
		const { items, layout } = this.state.gridConfig;
		if (!layout) {
			return;
		}
		const itemsCopied = cloneDeep(items);
		const editedItemIndex = this.calcEditedItemIndex(layout.zones, Number(zoneindex), Number(itemIndex));
		const isTertiaryChild = itemsCopied && Array.isArray(itemsCopied[editedItemIndex].items) && (tertiaryIndex || tertiaryIndex === 0);
		// $FlowFixMe
		const editedItem = itemsCopied[editedItemIndex];

		if (property) {
			// $FlowFixMe
			itemsCopied[editedItemIndex].invalidTitle = property === 'headline' && newValue !== undefined &&
				// $FlowFixMe
				!isValidHeadline(newValue);

			if (isTertiaryChild) {
				// $FlowFixMe
				itemsCopied[editedItemIndex].items[tertiaryIndex][property] = newValue;
			} else {
				// $FlowFixMe
				editedItem[property] = newValue;
			}
		} else {
			if (isTertiaryChild) {
				// $FlowFixMe
				itemsCopied[editedItemIndex].items[tertiaryIndex] = newValue;
			} else {
				// $FlowFixMe
				itemsCopied[editedItemIndex] = newValue;
			}
		}

		return itemsCopied;
	}

	setItemsOnPaste = (index: number, zoneindex: number, url: string, tertiaryIndex: number) => {
		const { externalAPI, setActiveCard } = this.props;
		let newItems;

		return externalAPI.resolveItem(url).then((model: *) => {
			const validModel = CurationItem.fromJSON(model);

			if (validModel.storyType && validModel.defaultBlogId) {
				externalAPI.getParentBlog(validModel.defaultBlogId).then(defaultBlogHost => {
					validModel.defaultBlogHost = defaultBlogHost &&
						validModel.storyType &&
						validModel.storyType.blogId !== validModel.defaultBlogId
						? defaultBlogHost.canonicalHost.replace(/https?:\/\//, '')
						: validModel.permalinkHost && validModel.permalinkHost.replace(/https?:\/\//, '');

					newItems = this.returnEditedItems(zoneindex, index, validModel, '', tertiaryIndex);
					newItems && this.resetItemsState(newItems);
				});
			} else {
				newItems = this.returnEditedItems(zoneindex, index, validModel, '', tertiaryIndex);
				newItems && this.resetItemsState(newItems);
			}
			if (setActiveCard) {
				setActiveCard(null);
			}

			// curation analytics
			window.ga && window.ga('send', 'event', 'Curation Tools', 'Curation Module - Add Article');
		}, error => {
			newItems = this.returnEditedItems(zoneindex, index, { isInvalid: true, error, errorMessage: 'Invalid post URL.' }, '', tertiaryIndex);
			newItems && this.resetItemsState(newItems);
		});
	}

	saveCardStateChange = (state: CardState, model: CurationItemProps, itemIndex: number, zoneIndex: number) => {
		const { headline, excerpt } = state.cardState;
		let newItems = [];
		let shouldSendEvent = false;

		if (headline) {
			newItems = this.returnEditedItems(zoneIndex, itemIndex, headline.next, 'headline', headline.tertiaryChildIndex);
			shouldSendEvent = headline.next !== headline.prev;
		} else if (excerpt) {
			newItems = this.returnEditedItems(zoneIndex, itemIndex, excerpt.next, 'plainTextExcerpt', excerpt.tertiaryChildIndex);
			shouldSendEvent = excerpt.next !== excerpt.prev;
		}
		this.resetItemsState(newItems);


		if (shouldSendEvent) {
			// curation analytics
			window.ga && window.ga('send', 'event', 'Curation Tools', 'Curation Module - Article Content Change',
				headline ? 'Headline' : 'Excerpt');
		}
	}

	returnItemsWithCustomImage = (zoneindex: number, itemIndex: number, image: ImageJSON, tertiaryIndex: number) => {
		const { items, layout } = this.state.gridConfig;
		if (!layout) {
			return;
		}
		const itemsCopied = cloneDeep(items);
		const editedItemIndex = this.calcEditedItemIndex(layout.zones, Number(zoneindex), Number(itemIndex));
		const isTertiaryChild = itemsCopied && Array.isArray(itemsCopied[editedItemIndex].items) && (tertiaryIndex || tertiaryIndex === 0);
		const editedItem = itemsCopied && itemsCopied[editedItemIndex];

		if (isTertiaryChild) {
			// $FlowFixMe
			itemsCopied[editedItemIndex].items[tertiaryIndex].curationImage = ImageModel.fromJSON(image);
		} else if (editedItem) {
			editedItem.curationImage = ImageModel.fromJSON(image);
		}

		return itemsCopied;
	}

	handleItemImageChange = (image: ImageJSON, zoneIndex: number, itemIndex: number, tertiaryChildIndex: number) => {
		const newItems = this.returnItemsWithCustomImage(zoneIndex, itemIndex, image, tertiaryChildIndex);
		this.resetItemsState(newItems);
		// curation analytics
		window.ga && window.ga('send', 'event', 'Curation Tools', 'Curation Module - Article Content Change', 'Thumbnail');
	}

	deleteItemModel = (zoneIndex: number, itemIndex: number, tertiaryChildIndex: number) => {
		const { setActiveCard } = this.props;
		let newItems;

		if (tertiaryChildIndex || tertiaryChildIndex === 0) {
			newItems = this.returnEditedItems(zoneIndex, itemIndex, {}, '', tertiaryChildIndex);
		} else {
			newItems = this.returnEditedItems(zoneIndex, itemIndex, {});
		}
		if (setActiveCard) {
			setActiveCard(null);
		}
		this.resetItemsState(newItems);

		// curation analytics
		window.ga && window.ga('send', 'event', 'Curation Tools', 'Curation Module - Delete Article');
	}

	relinkItemModel = (props: { model: CurationItemProps, zoneIndex: number, itemIndex: number}) => {
		const { model, zoneIndex, itemIndex } = props;
		const newItems = this.returnEditedItems(zoneIndex, itemIndex, {
			url: model.permalink
		});
		this.resetItemsState(newItems);
	}

	layoutConfigToString = ({ cardinality, group }: { cardinality: LayoutCardinality, group: LayoutGroup }): string => {
		return group && cardinality && `${group}${cardinality}`;
	}

	resetItemsState = (newItems: ?Array<CurationItemProps>) => {
		if (!this.state.gridConfig.layout) {
			return;
		}
		const { zones, group, cardinality } = this.state.gridConfig.layout;
		const nextState = {
			gridConfig: {
				layout: {
					cardinality,
					group,
					zones
				},
				items: newItems
			}
		};
		this.setState(prevState => ({
			...prevState,
			...nextState
		}));
	}

	render() {
		const { children, defaultLayouts, externalAPI } = this.props || {};
		const { gridConfig, toolbarItems } = this.state || {};
		const {
			deleteItemModel,
			handleItemImageChange,
			addEmptyItemsToTertiary,
			relinkItemModel,
			setItemsOnPaste,
			setLayout,
			saveCardStateChange,
			setCardSwapState
		} = this;

		if (!children) {
			throw new Error('<Card /> should be called with `children` as render props.');
		}

		const layoutConfigString = this.state.gridConfig.layout ? this.layoutConfigToString(this.state.gridConfig.layout) : '';
		const layoutClassName = this.state.gridConfig.layout ? `layout--${this.layoutConfigToString(this.state.gridConfig.layout)}` : '';

		return (
			this.state.gridConfig.layout ? <div
				className={classnames({
					'layout': true,
					[layoutClassName]: layoutConfigString
				})}
			>
				{children({
					externalAPI,
					defaultLayouts,
					deleteItemModel,
					gridConfig,
					handleItemImageChange,
					addEmptyItemsToTertiary,
					saveCardStateChange,
					imageUploader: externalAPI && externalAPI.imageUploader,
					relinkItemModel,
					setItemsOnPaste,
					setLayout,
					setCardSwapState,
					toolbarItems
				})}
			</div> : null
		);

	}
}

export default Layout;
