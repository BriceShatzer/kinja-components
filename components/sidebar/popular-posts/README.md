# PopularPosts ![ready](status-images/ready.svg)

A widget to be used in the sidebar displaying a number of popular posts. These can be:
- Recent articles from an author (usually displayed on a permalink, to display more articles from the author of the currently viewed article). To enable this mode, use the `recentLinks` property, passing in the name of the author and the url to the author(s). The text changes based on how many authors there are.
- Popular videos on a blog. To enable this, pass in the `isVideo` property along with the `blogDisplayName` property.
- Popular posts on a blog. To enable this, pass in the `blogDisplayName` property.
- Popular in your network: default behavior.

This only changes the header text of the widget. You need to pass in a list of SidebarPosts to display. They will be displayed as an image, headline, author name and publish date, along with recommendation / view count / reply count metrics on hover, if provided.

<!-- STORY -->

## Props

### posts

Type: _Array<SidebarPost>_

The posts to display. Although you can pass in any number of items, right now we usually display only 3. The items could have their viewCount, replyCount, likeCount fields resolved to display these metrics.

#### currentBlog

Type: _Blog_

The blog where the component is rendered
