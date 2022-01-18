# PullQuote ![ready](status-images/ready.svg)

Renders a pull quote component that is styled to stand out in the article. Has blog based custom styling, but those are only handled with css.
The content is represented as a list of inlinenodes. For more documentation on the InlineNodes structures themselves, see [here](../../../../postbody/InlineNode.md).

<!-- STORY -->

## Props

### value

Type: _Array<InlineNode>_

The list of nodes to render.

### alignment

Type: _string_

Possible values are: `'Center' | 'Left'`.
