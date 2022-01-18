# Radio

A radio button with a label. Doesn't make much sense on it's own, it's meant to be used inside a RadioGroup.

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| checked | `boolean` | x | `false` | Turn on the checked state
| inlineHelp | `string` | x  | - | Additional text related to the radio button
| label | `string` | ✓ | `''` | The label of the input
| name | `string` | ✓ | - | Name of the group where the radio button belongs to
| onClick | `ValueType => void` | ✓ | - | onClick callback
| value | `ValueType` | ✓ | - | Value of the element
