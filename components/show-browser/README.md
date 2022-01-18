# Show Browser

The Show Browser component displays recommended video lists on the video permalink pages.

[Storybook demo](http://localhost:8001/?selectedKind=Show%20browser)

<!-- STORY -->

## Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| videos | `Array<RelatedVideo>` | ✓ | [] | The videos to display in the list
| tabList | `Array<string>` | ✓ | [] | The list to display as categories on the top of the component
| blogGroup | `string` | ✓ |  | The blog group used for theming, e.g. `'avclub'`
| showMoreButton | `boolean` |  | `false` | Enable the show more button at the bottom of the component
| onTabChange | `(number) => void` |  | `false` | Tab change handler to request new data for the tab
