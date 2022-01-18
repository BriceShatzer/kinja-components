# DrawerMenu
 
An interactive component what renders two icons what belongs to story cards on mobile view. Contains an embiggen and a write icons to set and display the post's embiggen property and navigate to the editor by the post id. It can be opened and closed by clicking of the chevron icon.

## DrawerMenu Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|isEmbiggened | `boolean` | x | - | index of the card
|onEmbiggenClick | `(string | number, boolean, string) => void` | ✓ | - | callback when the embiggen icon was clicked
|onDrawerMenuIconClick | `boolean => void` | ✓ | - | callback when the chevron icon was clicked
|permalink | `string` | ✓ | - | permalink of the post
|postId | `'published' | 'scheduled' | 'drafts'` | ✓ | - | id of the post

## Example
 see story.js for example.