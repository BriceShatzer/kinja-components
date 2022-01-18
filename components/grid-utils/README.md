# Kinja Grid Utilities

Our **'grid utilities'** are a simple set of tools that help you create layouts that align to a vertical column grid. This approach is very different to grid systems used in CSS frameworks like bootstrap and zurb foundation - **ours is modeled after how grid layouts in print actually work**.

It's more of an approach to creating layouts than a framework, the actual utilities themselves being just a couple of functions/pre-generated values, exposed by the `grid-utils` module.

## Getting started (and a bit of a tl;dr)

Keep in mind:

* elements are not sized in relationship to their parents, but in relationship to the entire viewport
* don't think in terms of containers, rows and columns - directly set size on the elements you need aligned to the grid instead
properly sized elements arranged in a flow layout will align to the grid
* how you arrange elements in relation to one another is totally up to you (but flexbox is usually the way to go)
* elements will keep their size regardless of positioning or nesting

Size is set **in terms of columns and gutters**. Use `gridValue[screenName](valueExpression)` to set some property of an element.

```
	.element {
		${media.small`
			width: ${gridValue.small('6c')};
		`}

		${media.medium`
			width: ${gridValue.medium('6c')};
		`}

		${media.large`
			width: ${gridValue.large('8c')};
		`}

		${media.xlarge`
			width: ${gridValue.xlarge('12c')};
		`}

		${media.huge`
			width: ${gridValue.xxlarge('12c')};
		`}
	}
```

This section and the following examples should be enough to get you started, but in case you'd like to dig deeper, scroll down for a more detailed description of how grid utilities work.

## Examples

The following mock layout is an example of how the grid utilites can be used to create a responsive layout, it showcases how to create a layout and reusable components that will be aligned to the grid.
The example is composed from a `Page` component that contains a `Sidebar` (visible only on larger screens) and a `Stream` component.
Both contain a set of `Card`s, with different layouts based on which component renders them. Cards will bleed over the margin on some screen sizes.

<!-- STORY -->

## Value expressions

We're using custom value expressions to define sizes, it's easiest to think of these as CSS units.

They represent a **CSS value**, and can be assigned to any **CSS property**. They're converted into **CSS calc() statement**s (or values expressed in plain **CSS units** when possible) using the `gridValue()` function.

```
gridValue(valueExpression) -> 'calc(/*...*/)'
```

Values composed of three parts, all of them optional, but always arranged in the same order: minus sign, columns value, gutters value

### the minus sign (-)
It's a minus sign :shrug: The resulting value will be negative if present.

### the 'columns' value (c)
The number of columns an element this wide would span, including the gutters between these columns.

Integer values only - because it would rarely make sense to split a column.

### the 'gutters' value (g)
Usually needed when setting widths that would span a certain amount of columns and bleed over adjacent gutters, or when setting margins or paddings in multiples of a gutter

Decimal fractions can be used.

`'12c2g'` = a value equivalent to the width of twelve columns and two gutters

`'0.5g'` or `'-0c0.5'` = a negative value, the opposite of the width of half gutter

`''`, `'0c0g'`, `'-0c'`, or just  `'-'` = all valid, equal to `0px`

## Screen sizes and configuration

The grid can have different behaviours on different screens sizes (referred to as **screens**). This is defined in the `GridConfig` object, which is a collection of `ScreenConfig objects`, with the **names of screens** as keys.

```
GridConfig = {
	[screenName]: {
		// the width of the grid, if set
		// if not set, the grid will be fluid, full-width
		contentWidth?,

		// the number of columns and the size of the gutter
		totalColumns, gutterSize
	}
}
```

## The `value` function

Transforms a **value expression** into a **CSS calc statement**.

Internally, it's a curried function with the following signature:

`value(ScreenConfig)(valueExpression)`

In practice, `ScreenConfigs` will be applied during initialization, and an object containing a value function for each screen will be created:

`{ [screenName]: screenConfig => string }`

The internal form is worth mentioning, because it's important to remember that besides the value expression we're passing when using this, another argument, a `ScreenConfig` is also needed, but already applied! **The same expression will yield a different CSS calc statement for each screen!**

## The scrollbar issue

Due to how viewport units are specified, in browsers with constantly visible scrollbars (e.g. on Windows PCs or macs with a mouse plugged in), the value of `100vw` includes the width of the scrollbar, but `width: 100%` on the `<html>` element doesn't. Do take this into consideration when creating layouts.
How we chose to deal with this is by creating outer containers in the width of the entire grid without the outer gutters, centered horizontally. 

## Tips and tricks and caveats

When setting the size of an element using value functions, you have to **set a value for each screen size**. `screenSize-down` and `screenSize-up` style queries won't work with the generated CSS calc statements. This feels repetitive at first, but keeps CSS easy to understand, and helps avoid running into issues caused by CSS overrides.

**Try not to overuse the value utility**. Calc statements do bloat CSS and are less performant than values in plain CSS units.

You don't need to use grid utilities in component CSS. Keep things reusable! Declare elements that need to be on the grid as styled-components, export them, and target them from parent container CSS. This is extremely important with **highly dynamic components** (since their styles will be re-generated on each state change, with styles generated for the previous states left in the document).

Leave breathing room, because there will always be **rounding errors**. And be careful with **hairline borders**, too. **Extra pixels** can break a flow layout, so be prepared for that.

Use space between components wisely: you don't always have to fill the entire width of a container, e.g. you can fill a '12c' wide container with:

* 12 `1c` wide elements with `1g` margins (except the last one) 
* 12 `1c` wide elements spaced evenly
* 12 elements with flexible width that will be scaled to equal sizes with `1g` gutters between them

...the results will look the same, but #2 is less prone to bugs caused by rounding errors than #1, and #3 will generate the least amount of CSS. **There are many ways to create a layout, and remember, this is plain CSS**.

## Usage

The `gridValue` object is a collection of value utility functions exported by the `grid-utils` module. It contains a function for each screen size. This is the only exposed part of `grid-utils` and should be enough to have you covered.

The grid utility functions can be used anywhere in JS (they return plain strings), we'll be using them inside styled-components CSS template literals, as seen in the examples. Have fun!
