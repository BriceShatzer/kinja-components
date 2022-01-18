# ArticleCard
 
A component what renders a simple story card by the given props.

## ArticleCard Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|index | `Blog` | ✓ | - | index of the card
|pageType | `string` | ✓ | `manageblog` | page type of where the component appears
|post | `Post` | ✓ | - | a post object completed with a few custom fields
|onEmbiggenClick | `(string | number, boolean, string) => void` | ✓ | - | callback when the embiggen icon was clicked
|type | `'published' | 'scheduled' | 'drafts'` | ✓ | - | type of the card what should be rendered

## Example
 see story.js for example.