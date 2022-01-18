# Carousel ![ready](status-images/ready.svg) ![new](status-images/new.svg)

Simple four item carousel that can be used with any component.

[Storybook demo](http://localhost:8001/?selectedKind=4.%20Components%7CCarousel)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| posts | `Array<Post>` | ✓ | | Array of post objects.

## Example

```jsx
<Carousel posts={posts.items} />
```

The above will render:

![carousel](https://user-images.githubusercontent.com/182661/66615319-3351ca80-eb9a-11e9-8e43-7efbb9ee9d15.gif)
