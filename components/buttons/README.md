# Button ![deprecated](status-images/deprecated.svg)

The `Button` component takes a `label` property and renders a single `<button>` element into the DOM. With an icon takes an `icon` property and we should pass a React component in it. Extracts buttons from kinja-mantle templates.

*This component is DEPRECATED. Please use `Button19` instead of it.*

[Storybook Demo](http://localhost:8001/?selectedKind=Buttons&selectedStory=Basic%20Buttons)

<!-- STORY -->

## Props

All button properties will be passed over to the actual HTMLButtonElement.

### disabled

Type: _Boolean_

Priority modifier disables the button.

### fullwidth

Type: _Boolean_

Set the button's width to 100%.

### icon

Type: _string_

The name of the icon as it is in the css file, but without the `svg` prefix.


### sort

Type: _'circle'_ | _'share'_ | _'social'_

Button is used in a special way, it gets different style than generally.
### label

Type: _string_ [required]

The label of the icon required to create a button.

### labelPosition

Type: _'after'_ | _'before'_

If there is an icon prop, this prop can set the label position.

### small

Type: _Boolean_

Make the button smaller.

### variant

Type: _'amazon'_ | _'commerce'_ | _'error'_ | _'facebook'_ | _'twitter'_ | _'instagram'_ | _'youtube'_ | _'rss'_ | _'blogColor'_

Different type equal different style.

### weight

Type: _'primary'_ | _'secondary'_ | _'tertiary'_

Priority modifier determines the weight of the button.

#### Example

```jsx
<Button
	icon={<HeartIcon />}
	label="Heartbreaker"
	labelPosition="after"
	variant="error"
/>
```
The above will render:
```html
<button class="Button__ButtonWrapper-...">
	<div class="Button__ButtonInner-...">
		<svg class="icon__IconSVG-..." name="heart" color="white" stroke="true" opacity="full">
			<use xlink:href="#iconset-heart"></use>
		</svg>
		<span class="Button__Label-...">Heartbreaker</span>
	</div>
</button>
```

#### Themed buttons

To use a themed button that has a background of the blog's primary color, wrap it in a `<Theme>` component and use the `primary` variant:

```
<Theme blog="avclub">
	<Button label="The A.V. Club" variant="primary" />
</Theme>
```
