# Radio Group

A `RadioGroup` is an array of radio buttons that are related to each other. It's functionally similar to a `Select`, but it exposes all options by default. This makes it clearer and faster to use, but it also takes up more space. Use RadioGroups or CheckboxLists instead of Selects whenever it's possible.

[Storybook demo](http://localhost:8001/?path=/story/4-components-form-radio-group--radio-group)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| children | `Array<React.Element<typeof Radio>>` | ✓ | - | List of `<Radio>` components
| inlineHelp | `string` | x  | - | Additional text related to the radio button group
| name | `string` | ✓ | - | Name of the group where the radio buttons belong to
| onChange | `ValueType => void` | ✓ | - | onChange callback
| title | `string` | x | - | Title of the radio button group
