# Byline
 
A byline element what renders the authors' name and the published time.

## Byline Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|authors | `Array<User>` | x | - | array of author objects what will be provided to the `<MultipleAuthorsStatic>` component
|blog | `Blog` | x | - | Blog object
|isScheduled | `boolean` | x | - | meta time will get a label and different style
|pageType | `string` | ✓ | - | pageType of where the component appears
|post | `Post` | ✓ | - | post object

## Example
 see story.js for example.