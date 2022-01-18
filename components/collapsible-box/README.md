# CollapsibleBox Box

A wrapper box what's open state can be toggled by click.

[Storybook demo](http://localhost:8001/?path=/story/3-elements-collapsible-box--collapsible-box)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| children | `Array<*>` | ✓ | - | Anything can be passed in as children.
| icon | `React.Element<typeof Icon19>` | x | '' | Icon what appears before the title.
| isStatic | `boolean` | x | - | Make the box's state always open
| title | `string` | x | - | Title of the box
