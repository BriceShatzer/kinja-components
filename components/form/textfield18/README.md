# Textfield ![ready](status-images/ready.svg) ![new](status-images/new.svg)

A one line text input that fits into our form element.

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| autoGrow | `boolean` | x | - | element will grow with the text
| blogTheme | `BlogThemeName` | ✓ | - | add blogThemed style
| className | `string` | x | - | class for the element
| counter | `boolean` | x | - | display counter by the end of the input
| customIcon | `React.Element<typeof Icon19>` | x | - | display customIcon
| disabled | `boolean` | x | - | disable the input field
| error | `string` | x | - | if provided, this text will be displayed instead of the label, with warning coloring.
| forcedActiveStyle | `boolean` | x | - | element display with active style default
| inlineHelp | `string` | x | - | display extra text as help for the input
| inputRef | `React.Ref<'input'>` | x | - | can be used to access the input element in the DOM
| label | `string` | x | - | label of the input
| limit | `number` | x | - | if lenght of the value reaches this number, display an error text
| name | `string` | ✓ | - | an identifier for the input field
| onChange | `(string, HTMLInputElement) => void` | x | - | called every time the input value changes.
| onIconClick | `() => void` | x | - | called every time the custom icon is clicked.
| type | `string` | x | `text` | type of the input
| status | `default` or `loading` | x | `default` | displays indicator icons on the textfield to show its status
| value | `string` | x | - | value of the input

## Example
see story.js for example.
