# Second Scroll

Display the second scroll and recirc module  on the end of permalinks

[Storybook demo](http://localhost:8001/?path=/story/4-components-second-scroll--second-scroll)

<!-- STORY -->

## Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| post | `Post` | ✓ |  | The second scroll post
| scrollListItems | `Array<Post>` |  | [] | Other posts for the recirc module list
| loadedAdIndexes | `Array<number>` |  | [] | On which index the native ads are loaded in the recirc module list
| disableAds | `boolean` |  |  | 
| blogName | `string` |  |  | 
| pageType | `PageType` | ✓ |  |
| authors | `Lookup<User>` |  |  | Resolved authors for the posts
