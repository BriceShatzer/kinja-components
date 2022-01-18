# Filefield ![under-review](status-images/under-review.svg)

Simple input element with `type=file`.

<!-- STORY -->

## Props

This component accepts any property a [`HTMLInputElement`](https://github.com/facebook/flow/blob/6f02d79d5647e05cbeea47416d07ecaa5bc1aa33/lib/dom.js#L2737) would receive, and it passes them all over to the included file input element.

### name

Type: _String_

An identifier for the input field. The value will appear with this key in the form data.

### description

Type: _String_
| _Optional_

To be shown under the input field in the label

### onChange

Type: _SyntheticInputEvent => void_

Called every time the input value changes. Uses the HTML onchange event.

### error

Type: _String_
| _Optional_

If provided, this text will be displayed instead of the description, with warning coloring.
