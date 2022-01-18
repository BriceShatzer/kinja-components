# Theme ![ready](status-images/ready.svg)

Theme component to wrap other component to get common style options (color, font, etc.)
Wrapper for styled-component's ThemeProvider component, [read more here](https://www.styled-components.com/docs/advanced#theming)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| theme | `object` |  | `defaultTheme` | Use this prop to access a theme that you defined. Falls back to `defaultTheme` if not specified.
| blog | `string` |  |  | Use this prop to access one the blog themes.

## Usage Example

```javascript
<Theme
	theme={theme}
	blog={blog}
/>
```

## EnsureDefaultTheme

The `<EnsureDefaultTheme>` wrapper works similarly to `<Theme theme={defaultTheme}>`, but it passes through if it's wrapped in another `<Theme>`.

```javascript
<Theme theme={randomTheme}>
	<Theme>
		//This will get the default theme
	</Theme>
</Theme>
```

```javascript
<Theme theme={randomTheme}>
	<EnsureDefaultTheme>
		//This will get the random theme
	</EnsureDefaultTheme>
</Theme>
```
