# VerticalDistroContainer ![ready](status-images/ready.svg)

Fetches verticals for a given blog, formats them and displays them in a ToggleList.
Toggle values represent whether or not a vertical's posts should automatically be
spliced to the parent blog.

[Storybook Demo](http://localhost:8001/?selectedKind=VerticalDistroContainer)

<!-- STORY -->

## Props

### blogId
The id of the current blog.

### profileApi
the API object that makes the necessary calls to hydrate the component. Currently fairly tightly coupled to the kinja-mantle profile api client implementation.

## State

### toggleProps
Holds the props for the toggle components within the toggleList.
