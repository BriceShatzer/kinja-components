# Commerce Permalink Module

A module on permalinks that displays a story card of a commerce post.

<!-- STORY -->

## Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| blog | `Blog` | ✓ | - | current blog object
| locale | `string` | x | `en-US` | language for translations
| pageType | `PageType` | ✓ | - | pageType where the module appears
| posts | `[ {post:SidebarPost, authors: [User]} ]` | ✓ | - | array of objects containing a SidebarPost object & that post's authors



## Example
see story.js for example.