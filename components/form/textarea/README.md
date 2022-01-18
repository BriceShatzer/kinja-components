# Textarea ![under-review](status-images/under-review.svg)

The `Textarea` component takes a `label`, a `name`, and an `onChange` property and renders `<textarea>` element into the DOM.

[Storybook Demo](http://localhost:8001/?selectedKind=Form&selectedStory=Textarea%20%28basic%29)

<!-- STORY -->

Textarea in [UI-Kit](https://kinja.com/ui-kit/forms-textarea).

## Props

### autogrow

Type: _boolean_

Set the type of the textarea element. If it's `true`, the `rows` attribute of the
`<textarea>` will be always `null`.

### label

Type: _string_ [required]

Label of the _textarea_.

### name

Type: _string_ [required]

This value is gonna be the _name_, _id_ of the _textarea_, and the _for_ of the _label_.

### onChange

Type: `string => void` [required]

Callback called with textarea's value when it changes.

### defaultValue

Type: _string_

Static, default value for _textarea_.

### rows

Type: _number_
Default: _3_

Number of lines in the _textarea_.

### value

Type: _string_

Set a computed value for the _textarea_.

### error

Type: _string_ [required]

Text of the error message what appears when the value of the _textarea_ is invalid.

### counter

Type: _boolean_
| _Optional_

If set to true a character counter will be shown in the top right corner of the input.

### limit

Type: _number_
| _Optional_

If set an error message will be shown when the character count exceeds the limit.

#### Example

### Static

```jsx
<Textarea
   defaultValue="Simple Bio"
   label="Sample Label"
   name="bio"
   onChange={...}
   rows={3}
/>
```

The above will render:
```html
<label class="field" for="bio">
   <textarea class="textarea--box" id="bio" name="bio" rows="3">Simple Bio</textarea>
   <span class="fielddescription">Sample Label</span>
</label>
```

### Computed

```jsx
<Textarea
  value={this.state.value}
  label="Sample Label"
  name="bio"
  onChange={...}
  rows={3}
/>
```

### Autogrow

```jsx
<Textarea
  autogrow
  value={this.state.value}
  label="Sample Label"
  name="bio"
  onChange={...}
/>
```
