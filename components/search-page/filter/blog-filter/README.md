# Blog Filter

A component with a list of selectable blogs as checkbox.

[Storybook demo](http://localhost:8001/?path=/story/4-components-search-filter--blog-filter)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| blogTheme | `blogTheme` | x | `default` | Add blogTheme to the checkbox
| blogs | `Array<Blog>` | ✓ | - | A list of Blogs models
| checked | `Array<string>` | x | - | A list of blogIds
| defaultBlogId | `?BlogId` | ✓ | - | Default blogId what will be default selected if there is no `checked` passed
| isNetwork | `boolean` | ✓ | - | if `false` than Kinja Fringe will be checked
| hasKinjaFringe | `boolean` | x | `false` | display `Kinja Fringe` checkbox in the list
| locale | `Locale` | ✓ | `en-US` | Country and language code
| onChange | `(state: State) => void` | ✓ | - | Will be called with the component's state when it has changed
