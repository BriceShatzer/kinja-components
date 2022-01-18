# Post List

This is a wrapper of a list of compact story-cards displayed on the search page.

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| blogTheme | `BlogThemeName` | ✓ | | blogTheme.
| dividerIndex | `?number` | x | | Index of the post after the divider will be displayed.
| hasResults | `boolean` | x | `true` | If `false` the no results text will be displyed uppermost.
| locale | `Locale` | ✓ | `en-US` | Country and language code.
| networkName | `string` | ✓ | | Name of the network where all the posts from.
| numberOfResults | `number` | x | | Number of posts will be displayed.
| pageType | `PageType` | ✓ | | Pagetype.
| posts | `Array<Post>` | ✓ | | A list of post objects.
| storiesFrom | `Array<string>` | ✓ | | DisplayNames of the blogs where the posts from.
