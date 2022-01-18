# Review data list ![ready](status-images/ready.svg)

This component is used in the review data form. This is the part that lets you define key value pairs for misc data. Lets you add new rows and remove existing ones. You can even leave the label out and just fill out the value.

<!-- STORY -->

## Props

### value

Type: _Array<ReviewDataLine>_

Array of objects containing label and value strings

### onChange

Type: _Array<ReviewDataLine> => void_

The change event handler is called every time the user types.

### language

Type: _String_

i18n locale string
