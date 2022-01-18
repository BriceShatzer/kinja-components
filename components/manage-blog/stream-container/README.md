# StreamContainer
 
A container what renders a list of `<FeedItem>` and `<Splice>` similarly to the stream page. All the splices have a different style from a normal post and there are inserted `<PromotedSplice>` placeholder between the posts.

<!-- STORY -->

## StreamContainer Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|hasActivePromotions | `boolean` | ✓ | - | there will be promoted slices in the stream
|blog | `Blog` | ✓ | - | blog object of where the component appears
|hasMore | `boolean` | ✓ | - | if `true` the *Load More* button will be displayed
|isLoading | `boolean` | ✓ | `false` | if `true` the *Loading Component* will be displayed instead of the *Load More* button
|locale | `Locale` | ✓ | `en-US` | language for translations
|onEmbiggenClick | `(PostId, boolean, string) => void` | ✓ | - | callback when the `<FeedItem>`'s embiggen button was clicked
|onLoadMoreClick | `() => void` | ✓ | - | callback when *Load More* button was clicked
|pageType | `string` | ✓ | `manageblog` | page type of where the component appears
|posts | `Array<Post>` | ✓ | - | list of published posts
|scheduledPosts | `Array<Post>` | x | - | list of scheduled posts

## Example
 see story.js for example.