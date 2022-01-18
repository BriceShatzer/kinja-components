# ImageAttribution ![ready](status-images/ready.svg)

Render image attributions from postbody format. [For the format search for "Attribution"](https://github.com/gawkermedia/kinja-core/blob/master/doc/Post%20Format/Specification.md)

[Storybook Demo](http://localhost:8001/?selectedKind=ImageAttribution&selectedStory=Image%20Attribution)

<!-- STORY -->

## Props

### attributions

Type: `Array<ImageAttribution>`

### tokenize

Type: `boolean` | _Optional_

`false` by default, when set to true it will render attributions wrapped in spans.

Example:
```html
<span class="item">
  <span class="credit">...</span>
  <span class="source">...</span>
</span>
```

This is so the editor can parse the output and re-create the attributions model just from info from the DOM.

### language

Type: `string` | _Optional_
