# Tag Pages

This is the wrapper around the components on the tag pages, using page layout components to organize the elements on the page.

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| blog | `Blog` | ✓ | | The current blog, used to render the static footer.
| tagName | `string` | ✓ | | The tagname to display
| pageType | `string` | ✓ | tagpage | Page type (TODO: might not be needed for the react app?)
| posts | `Array<Post>` | ✓ | | List of posts for the specified blog with the specified tag
| authors | `Lookup<User>` | x | | List of users resolved for posts
| pagination | `Pagination` | ✓ | | Pagination info
