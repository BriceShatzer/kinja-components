# Toggle ![deprecated](status-images/deprecated.svg)

> Toggles are deprecated, please use [a checkbox](http://localhost:8001/?selectedKind=3.%20Elements%7CForm%2FCheckbox) instead. If in doubt, ask your team’s designer!

The `Toggle` component takes a `label`, a `name`, and an `onChange` property and renders `<input type="checkbox" />` element into the DOM.

[Storybook Demo](http://localhost:8001/?selectedKind=Form&selectedStory=Toggle)

<!-- STORY -->

## Props

### checked

Type: _boolean_

Set the toggle default checked.

### label

Type: _string_ [required]

Label of the _input (toggle)_.

### name

Type: _string_ [required]

This value is gonna be the _name_, _id_ of the _input (toggle)_, and the _for_ of the _label_.

### onChange

Type: `string => void` [required]

Callback called with checked's value _(true or false)_.

### small

Type: _boolean_

Smaller version of the _toggle_. The _input_ gets gets a `toggle--small` class.

#### Example

```jsx
<Toggle
	checked
	label="My Tiny Toggle"
	name="toggle2000"
	onChange={...}
	small
/>
```

The above will render:
```html
<label class="field toggle-container" for="toggle2000">
	<span class="prepend toggle toggle--small">
		<input type="checkbox" name="toggle2000" id="toggle2000" checked />
		<label for="toggle2000" />
	</span>
	<span class="fielddescription">My Tiny Toggle</span>
</label>
```
