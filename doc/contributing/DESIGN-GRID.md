# Designing with the Kinja Grid ![under_review](status-images/under-review.svg)

The Kinja Design Team uses a spacing system to position elements on Kinja pages. We call this system the Kinja Grid. (Not to be confused with CSS display:grid.)

Our goals for using this system are to:

- Make our pages look better and more organized.
- Reduce CSS complexity.

## Spacing Units

For all margins and paddings, we use the following values exclusively:

- 4px
- 8px
- 16px
- 24px
- 32px
- 40px
- 48px
- 56px
- 64px

## Vertical Spacing

For vertical positioning of elements, our guidelines are to:

- Set vertical space between elements to one of the spacing units.
- For text, use line heights that conform to one of the spacing units.

## Horizontal Spacing

For horizontal positioning of elements, our guidelines are to:

- Make everything fit the grid (see below).
- If something doesn’t make sense to fit the grid (for example: if using the grid would upset the [principle of proximity,](https://uxplanet.org/gestalt-theory-for-ux-design-principle-of-proximity-e56b136d52d1) or if you want to arrange 3 items in 4 columns), choose margins/paddings from the spacing units.

### Horizontal Grid

On the _small_ and _medium_ breakpoint ranges, between 316px and 799px viewport width, we use a 6-column liquid (100% width) layout with a 16px gutter and margin:

![grid-316](grid-illustrations/grid316-6-16.png)

On the _large_ breakpoint range, between 800px and 1019px, we use an 8-column liquid layout with a 24px gutter and margin:

![grid-800](grid-illustrations/grid800-8-24.png)

On the _xlarge_ breakpoint range, between 1020 and 1363px, we use a 12-column liquid layout with a 24px gutter and margin:

![grid-1020](grid-illustrations/grid1020-12-24.png)

On the _xxlarge_ breakpoint range, 1364px and over, we use a 12-column fixed width (1364px wide including outside gutters) layout with a 32px gutter and margin:

![grid-1364](grid-illustrations/grid1364-12-32.png)

Notice that we always use a full gutter on the outside, as opposed to a half gutter. This is different from most grid layouts.

If you want to know about how to actually implement Kinja Grid layouts, see documentation for our [Kinja Grid Utilities.](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/components/grid-utils/README.md)


## Learn more

- [Kinja Grid Utilities](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/components/grid-utils/README.md)
- [Kinja Design Kit](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/DESIGNKIT.md)
