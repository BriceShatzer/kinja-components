# ManageBlogNav
 
Navigation bar for the manage blog page. Active state controlled by the given props.

<!-- STORY -->

## ManageBlogNav Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|activeMenu | `string` | ✓ | - | name of the selected menu (should match with one of the menuItems)
|activeSubMenu | `string` | ✓ | - | name of the selected submenu
|onSearch | `string => void` | ✓ | - | callback called with searchquery
|onItemClicked | `(string, Array<string>) => void` | ✓ | - | name of the post used for navigating to a new url
|onlyPostsNavigation | `boolean` | ✓ | - | display only the Post menu and its submenus

## Example
 see story.js for example.