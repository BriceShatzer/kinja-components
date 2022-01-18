# FolderSelector ![ready](status-images/ready.svg) ![new](status-images/new.svg)

`FolderSelector` is a reusable picker component for hierarchical information. It was introduced for story types and categories, but is suitable for any kind of nested categorization.

The selector's minimum set of props are `levels` and `onSelect`.

<!-- STORY -->

## `levels`

To use `FolderSelector`, you need a minimum of two levels of items. If you only have one level of information, use a simple `Select` instead.

The user can select a nested category structure, AKA a path. When they click an item, tis children will be listed in the next column so the user can now select an item from that column--and so on until the last level of hierarchy.

By clicking a selected item, the user can deselect it and remove it from the path. These states are handled internally - to react to the user committing their selection, see the "`onSelect` & `onCancel`" section.

These levels are passed in through the selector's `levels: Array<Level>` prop. The levels are displayed in the order they were passed in: a level with the index `0` is considered the top level and the parent of index `1`.

There is no maximum number of levels. At a minimum, a level should have a `getItems(ItemId) => Array<Item>` property to be able to fetch its items. When selecting an item, the item's ID is passed on to the next level's `getItems` which should return the children of the selected item. Since the top level's contents won't change dynamically, it's preferred to not fetch anything and just return the data you already have. (If it _should_ change, passing it in as new props will do the trick.) `getItems` methods of other levels too can check if any fetching is necessary.

### `Level`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | `string` | x | |
| displayName | `string` |  | If provided, this will show up as the folder title instead of `id`.
| items | `Array<Item>` |  | Initial items to render. When not provided, the component calls getItems instead. |
| getItems | `ItemId => Array<Item>` | x | |
| selection | `ItemId` | | ID of the initially selected item. Make sure to update this prop when a user commits to a selection other than the initial one. |
| required | `boolean` | | If `true`, the user won't be able to deselect items (but will be able to change the selection to another item). |

### `Item`

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| name | `string` | x | | The item's label.
| id | `string` | x | | The item's ID; unique among this level's items
| icon | `<Icon />, </BlogAvatar />` | | Defaults to a folder icon (or the video variant). | Icon that appears in front of item; top-level item icons also appear in the select label.
| hasChildren | `boolean` | | false | If `true`, the item will display an arrow to indicate that it will open a new level upon selection.
| isVideo | `boolean` | | false | If there's no icon passed in, this will alter the default icon's appearance.

## `onSelect` & `onCancel`

When the user is finished and hits the "Move to here" button, the selector's `onSelect` prop is called with an array of selected ID's. While the selector also keeps track of selections in its own internal state, it's a good idea to use this callback to persist the selection and confirm it by passing it as new props.

Optionally, you can define what happens when the user cancels the current selection by passing an onCancel prop.

## `multipleSelection`

If this prop is passed the component behaviour it will change and will accept multiple selected items. The levels are limited for 2 level deep and the child `item`'s object should contain a `parentId` besides the defined ones above. This is required because the dropdown doesn't display both the parent and children items at the same time.

_expanding the table in the item section:_

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| parentId | `string` | ✓ | - | Id of the parentItem what this element related to
| onChange | `(selectedBlogs: Array<Item> | []) => void` | x | - | This callback is called when selected items have changed

## Initializing the component

The selector should always be initialized with at least two levels with their respective `getItems` methods.

## Initializing existing selections

To make the component display a set of selected items by default, you can define `selection`s when you pass in your levels. This also comes in handy when a user have just saved their selection and you need to update the props with the server response.

```js
<FolderSelector levels={[
	{
		id: 'blogs',
		getItems: async () => await api.getBlogs(),
		selection: 'id of initially selected item'
	},
	{
		id: 'storyTypes',
		getItems: async blogId => await api.getStoryTypes(blogId),
		selection: 'id of initially selected item'
	}
]} />
```

Optionally, you can pass in the initial `items` so the component doesn't have to fetch them.

```js
<FolderSelector levels={[
	{
		id: 'blogs',
		getItems: async () => await api.getBlogs(),
		items: [
			{name: 'trabalhadores', id: 'abc'},
			{name: 'mais rapidos', id: 'def'}
		],
		selection: 'abc'
	},
	{
		id: 'storyTypes',
		getItems: async blogId => await api.getStoryTypes(blogId),
		items: [
			{name: 'descortinando', id: 'ghi'},
			{name: 'do mundo', id: 'jkl'}
		],
		selection: 'jkl'
	}
]} />
```

[Storybook demo](http://localhost:8001/?selectedKind=FolderSelector)
