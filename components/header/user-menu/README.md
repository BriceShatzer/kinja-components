# Header / User Menu  ![new](status-images/new.svg)

UserButton component. Wrapped in [Toggle](../hoc/toggle/).

### General Structure
**Note:** The structure noted here is being used for design QA via storybook. The final released version will have the
`UserButton` residing inside a wrapper component which will receive props related to API calls, login functions, etc.

```jsx
  <UserButton>
    <UserButtonPanel>
      <UserButtonMainMenu />
      <UserButtonBlogsMenu />
    </UserButtonPanel>
  </UserButton>
```

<!-- STORY -->

### Props

```
  currentBlog,
  currentUser,
  feature,
  ga,
  imageUrl,
  insideReference,
  isMobile,
  isOpen,
  logout,
  onClick,
  postId,
  pageType,
  version2,
  toggle
```
