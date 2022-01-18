# ButtonGroup ![ready](status-images/ready.svg)

The `ButtonGroup` component takes a `ButtonGroupItem` component as a child and renders a single `<div>` element into the DOM. Extracts button group from kinja-mantle templates. To have small sized buttons use the 'small' property on the ButtonGroup component

[Storybook Demo](http://localhost:8001/?selectedKind=Button%20Group&selectedStory=Basic%20Button%20Group)

<!-- STORY -->

## Props

### small

Type: _Boolean_
Default: _false_

Make the surrounded buttons smaller (buttons inside get the `small` prop).

### onChange

Type: _string => void_ [required]

Callback called with button's value when user clicks it.

### children

Type: _React.ChildrenArray<React.Element<typeof ButtonGroupItem>>_

The component must have `<ButtonGroupItem />` children.

#### Example

```jsx
<ButtonGroup onChange={...} small>
	...
</ButtonGroup>
```


# ButtonGroupItem

The `ButtonGroupItem` component returns a `<Button />` component.

## Props

### active

Type: _boolean_

Depending on this prop it changes the button's weight (_'primary'_ | _'secondary'_) and the icon's color (_'white'_ | _'primary'_) if it's passed as a prop.

### icon

Type: _React.Node_

If the `active` prop is true, it clones the React element with a `color: 'white'` prop.


#### Example

```jsx
<ButtonGroup onChange={...}>
	<ButtonGroupItem label="A Button" value="First Button" selected />
	<ButtonGroupItem label="Middle Button" value="Middle Button" />
	<ButtonGroupItem
		icon={<HeartIcon />}
		label="Hearted Button"
		labelPosition="after"
		value="Hearted Button"
	/>
</ButtonGroup>
```
