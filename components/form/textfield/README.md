# Textfield ![deprecated](status-images/deprecated.svg)

> This design is deprecated, please use [the new textfield component](http://localhost:8001/?selectedKind=3.%20Elements%7CForm%2FText%20Field&selectedStory=Textfield18) instead! If you’re working on something that is not fully in React, and need new and legacy textfields on the same page, ask your team’s designer on how to proceed.

A one line text input that fits into our form element.

<!-- STORY -->

## Props

This component accepts any property a simple input element would receive, and it passes them all over to the included input element. This includes `value`, `type`, `disabled`, `maxLength` etc.

### name

Type: _String_

An identifier for the input field. The value will appear with this key in the form data.

### description

Type: _String_

To be shown under the input field in the label

### onChange

Type: _String => void_

Called every time the input value changes. Uses the HTML onchange event, which triggers on paste as well.

### inputRef

Type: _HTMLInputElement => void_
| _Optional_

Can be used to access the input element in the DOM for purpuses like invocing the `focus()` method on it.

### error

Type: _String_
| _Optional_

If provided, this text will be displayed instead of the description, with warning coloring.

### counter

Type: _boolean_
| _Optional_

If set to true a character counter will be shown in the top right corner of the input.

### limit

Type: _number_
| _Optional_

If set an error message will be shown when the character count exceeds the limit.

### fullWidth

Type: _boolean_
| _Optional_

If set the field will be full width no matter what (regular fields are capped at 400px).

### placeholder

Type: _String_
| _Optional_

If set a placeholder will be shown.
