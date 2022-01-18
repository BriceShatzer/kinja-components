# PermalinkByline
 
A Permalink byline element what renders the authors' name and the published time. It will show user avatars in the byline if it is possible.

<!-- STORY -->

## Byline Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|authors | `Array<User>` | x | - | array of author objects what will be provided to the `<MultipleAuthorsStatic>` component
|blog | `Blog` | x | - | Blog object used to determine if we hide authors on satire sites
|isScheduled | `boolean` | x | - | used by the MetaTime component
|pageType | `string` | ✓ | - | pageType of where the component appears, for example for Permalink pages, we pass it to the `<MultipleAuthorsStatic>`
|post | `Post` | ✓ | - | post object

## Example
 see story.js for example.
