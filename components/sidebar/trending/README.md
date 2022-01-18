# Trending ![ready](status-images/ready.svg)

Trending component to display posts from other blogs in the sidebar

<!-- STORY -->

### Props

#### posts

Type: _Array<SidebarPost>_

Posts to display

#### currentBlog

Type: _Blog_

The blog where the component is rendered

#### maxPosts

Type: _number_

Maximum number of posts to display. Default is 3

### Example

```javascript
<Trending
	posts={posts}
	currentBlog={blog}
/>
```
