# Header / Elements / Network Tile  ![under-review](status-images/under-review.svg) ![new](status-images/new.svg)

`NetworkTile` component, for use in the <a target="_blank" href="https://docs.google.com/presentation/d/1DLU8NPzsu4_Xm5EA9abDN5mZ0rnETK6lJ42TMyGL12g/edit#slide=id.g4df7d44d98_0_204">new navigation</a>

<!-- STORY -->

### Props

```js
	blogName: string,
	tagline?: string
```

### General Structure

Uses the provided `blogName` to attempt to retrieve both a logo via the [BlogLogo](https://gawkermedia.github.io/kinja-components/?path=/story/3-elements-branding-blog-logo--bloglogo) component and a color for the tile via the [Color Palette](https://gawkermedia.github.io/kinja-components/?path=/story/2-styles-utilities-color--color-palette) (<a target="_blank" href="https://git.io/fjB12">theme/themes.js</a>).

If no logo is found, the plain text of the provided `blogName` value and the default primary color (`#0A7BC2`) are used.
