// @flow

import Icon19 from '../icon19/icon19';
import BlogAvatar from '../blog-avatar';
import Image from '../elements/image';

type ItemId = string;
type LevelId = string;

type Item = {
	name: string,
	id: ItemId,
	parentId?: ItemId,
	icon?: React.Element<typeof Icon19> | React.Element<typeof BlogAvatar>,
	hasChildren?: boolean,
	selectedChildren?: Array<Item>,
	isFirst?: boolean,
	isLastSelection?: boolean,
	isVideo?: boolean,
	avatar?: React.Element<typeof Image>,
	content?: string,
	browserInnerRef?: ?HTMLDivElement,
	folderInnerRef?: ?HTMLDivElement,
	multipleSelection?: boolean,
	isParentSelected?: boolean
};

type SelectedItem = {
	id: LevelId,
	selection?: ?ItemId
};

type ItemProps = Item & {
	selected?: boolean,
	onSelect?: (id: ItemId) => void,
	isLastSelection?: boolean,
	toggleTooltip?: (e: SyntheticMouseEvent<HTMLElement>) => void
};

type LevelKey = number;

type Level = {
	id: LevelId,
	displayName?: string,
	items?: Array<Item>,
	getItems: (id: ?ItemId, levels: Array<Level>) => Promise<Array<Item>>,
	selection?: ?ItemId,
	required?: boolean
};

type LevelState = Level & {
	key: LevelKey,
	isLastSelection?: boolean
};

type Ref = {
	current: null | HTMLDivElement
};

export type {
	ItemId,
	Item,
	ItemProps,
	LevelKey,
	LevelId,
	Level,
	LevelState,
	SelectedItem,
	Ref
};
