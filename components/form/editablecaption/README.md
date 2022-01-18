# EditableCaption ![under-review](status-images/under-review.svg)

A figcaption that will function like a `<TextField />` component, but allow for html inputs for textNode Rendering.

<!-- STORY -->

## Prop

### html

Type: _String_

Value entered into figcaption, will be the innerHTML of the element

### description

Type: _String_
| _Optional_

To be shown under the input field in the label

### error

Type: _String_
| _Optional_

A string to be shown under the input field if an error exists

### onChange

Type: _String => mixed_

Called every time the figcaption innerHTML changes.

### className

Type: _String_
| _Optional_

An optional className that can be targeted outside of the component sass file.
