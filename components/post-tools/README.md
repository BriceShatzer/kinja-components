# Post Tools ![new](status-images/new.svg)

This component houses the tooling that renders when hovering to the right of the post byline, if the user has the proper permissions. It allows authors to edit their posts directly from permalink and front pages, as well as sharing and various other tooling.

<!-- STORY -->

## Post Tools Wrapper

This is the server-rendered component that allows the client hydration to hook in and get enough data to re-render.

## Frontpage Post Tools

The post tools that render next to posts on front pages.

## Permalink Post Tools

The post tools that render next to posts on permalink pages.

## Sample usage
```javascript
<PostTools post={post} dropdownContents={dropdownContents} />
```
