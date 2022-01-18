# BlogSettingsContainer ![under-review](status-images/under-review.svg)

Blog Settings container component. Facilitates toggling some `blogProperties` from the `manageBlog/settings` page

[Storybook Demo](http://localhost:8001/?selectedKind=BlogSettings)

<!-- STORY -->

## Props

### profileApi

The Profile API object. This component makes calls to kinja-profile to get blogProperties and persist new ones.

### blogProperties

The initial blogProperty values with which to hydrade the component. These aren't strictly necessary as the component hydrades itself with an API call in `componentDidMount`.

### currentBlogId

The ID of the current blog. Passing the entire blog object isn't necessary and violates separation of concerns.

### defaultBlogSettings

A constant containing the default order, value, and display names of all the included blogProperties. If in the future more blogProperties are to be added to the component, one should edit this constant.
