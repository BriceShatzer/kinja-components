# BlogAvatar

The `BlogAvatar` component takes a `name` property and renders a single svg element into the dom.

[Storybook demo](http://localhost:8001/?selectedKind=BlogAvatar)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| name | `string` | ✓ |  | The avatar's name, a `blogGroup` string (ex. `'avclub'`).
| size | `number` |  | `100` | The dimension used for the width and height of the Avatar in pixels.

[comment]: <> ( TODO: Explain when and why to use the anchor prop )

```

## Avatar from optimized SVGs
```jsx
<BlogAvatarNew name="avclub" />
```

The above will render:

```html
<span class="blog-avatar__BlogAvatarWrapper-ynl58c-0 hMijTS">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    aria-label="TheAVClub avatar"
    viewBox="0 0 64 64"
  >
    <g fill="none" fill-rule="evenodd">
      <path fill="#1C263C" d="M0 64h64V0H0"></path>
      <path
        fill="#FFF"
        d="M42.66 49.29l-14.8-32.24 7.05.05 7.6 17.92 7.73-17.78 6.48.05H57l-14.34 32zM22.38 32.24l3.38 7.62-7.04-.14 3.66-7.48zM7 48.91l6.82.14 1.88-4.07 12.87.26 1.6 3.94 6.78.06L22.68 17 7 48.9z"
      ></path>
    </g>
  </svg>
</span>
```
