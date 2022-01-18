# Heading ![under-review](status-images/under-review.svg)

This component renders a list of inlinenodes into a heading element (for more documentation on InlineNodes, see [here](../../../../postbody/InlineNode.md).). You can set the level of the heading from 2-4; level 1 is reserved for the post title. You can also set the alignment, and insert special commerce headings when setting the `icon` property. Examples of these can be found on any Deals summary post like [this one](https://deals.kinja.com/sundays-best-deals-4k-monitor-razer-blades-discounte-1823305937). Note that these icons styles are currently only available for level 3 headings.

<!-- STORY -->

## Props

### value

Type: _Array<InlineNode>_

The list of nodes to render.

### level

Type: _number_ | _Optional_ | Default: 4

Sets the html heading element to use. Possible values are 2, 3, 4. Level 1 headings are reserved for the post headline.

### alignment

Type: _HeaderAlignment_ | _Optional_ | Default: 'Left'

Possible values are: `'Left' | 'Center' | 'Right'`

### icon

Type: _HeaderIcon_ | _Optional_

Sets a commerce icon to the left of the heading. Note that although the element will get the proper class name in any case, there are only stylings defined for level 3 headings. These are not available to set in the editor either - the commerce team copy-pastes the html every time. Should not see use outside of that use case.
Possible values are: `'Top' | 'Tech' | 'Gaming' | 'Multimedia' | 'Home' | 'Lifestyle' | 'Beauty'`
Example: <h3 class="commerce-icon--tech">Tech</h3>

### containers

Type: _Array<Container>_ | _Optional_

An array of containers the heading should be in. You should note that in theory, it could have any container, but in practice the editor only allows for BlockQuoteContainer.
