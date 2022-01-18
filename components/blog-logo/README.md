# BlogLogo ![ready](status-images/ready.svg)

The `BlogLogo` component takes a `name` property and renders an svg element in a `LogoWrapper` into the dom.

[Storybook Demo](http://localhost:8001/?selectedKind=BlogLogo)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| name | `string` | Required | - | A blogGroup string (eg. avclub)
| scale | `number` | Not required | `1` | Use this prop to resize logos while keeping their proportions and alignment. The default 1.0 value means 32px x-height.
| monochrome | `boolean` | Not required  | `false` | If true, a monochrome version of the logo will be rendered that uses `currentColor` so it can inherit its color.

## Responsive sizing

The `scale` prop is passed to a CSS custom property on `LogoWrapper` so you can override it in CSS like this:

```jsx
import media from '../../style-utils/media';
import BlogLogo, { LogoWrapper } from '../blog-logo';

const ResponsiveLogo = styled.div`
	${LogoWrapper} {
		--scale: 0.5;
		${media.largeUp`
			--scale: 0.8;
		`}
	}
`;
```

## Example

```jsx
<BlogLogo name="avclub" scale={0.5} />
```
