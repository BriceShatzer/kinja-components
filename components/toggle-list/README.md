# ToggleList ![under-review](status-images/under-review.svg)

A list of Toggle Components

[Storybook Demo](http://localhost:8001/?selectedKind=ToggleList)

<!-- STORY -->

Right now this component is a simple wrapper that renders a list of Toggle components.
It also provides some styling to its children, allowing them to appear as a row.

## Props

### toggles

An array of ToggleProps. Note that this Flow type is exposed in `types.js` as it is shared across components.

`
{
	name: string,
	checked: bool,
	label: string,
	onChange: void => void,
	small: bool
}
`
