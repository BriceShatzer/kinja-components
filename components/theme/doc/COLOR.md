# Color Palette ![ready](status-images/ready.svg)

Kinja's UI and Brand colors. See them in a grid with background-text color combo examples in [Storybook](http://localhost:8001/?selectedKind=2.%20Styles%20%26%20Utilities%7CTheme%2FColor&selectedStory=Color%20Palette).

<!-- STORY -->

## Accessibility
If you use colored text, or write text on a colored background, make sure the background-text [contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#contrast-ratiodef) is at least `4.0`. You can check color contrast with [get-contrast](https://www.npmjs.com/package/get-contrast):
```javascript
contrast.ratio('#fafafa', 'rgba(0,0,0,.75)') // => 10
```

## Usage
First make sure your component is wrapped in `<Theme>` or `<EnsureDefaultTheme>` then

```JSX
const LightGrayDiv = styled.div`
	background-color: ${props => props.theme.color.lightgray};
`
```
