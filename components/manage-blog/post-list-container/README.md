# PostListContainer
 
PostListContainer wraps a list of <ArticleCard>s what are passed as children.

## PostListContainer Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|children | `Array<React.Element<typeof ArticleCard>>` | x | - | a list of <ArticleCard>
|hasMore | `boolean` | ✓ | - | if true a *Load More* is displayed at the bottom
|isLoading | `boolean` | x | `false` | if true a <Loading> component is displayed at place of the Load More button
|onLoadMoreClick | `() => void` | ✓ | - | callback for the Load More button
|status | `'published' | 'scheduled' | 'drafts'` | ✓ | - | it's needed for the table titles

## Example
 see story.js for example.