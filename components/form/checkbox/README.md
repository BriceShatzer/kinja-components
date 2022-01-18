# Checkbox ![ready](status-images/ready.svg)
A labeled checkbox

[Storybook demo](http://localhost:8001/?selectedKind=2. Elements|Form/Checkbox)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| blogTheme | `blogThemeName` | `x` | `default` | Add `blogTheme` color to the active / hover state
| checked | `boolean` | `x` | `false` | Is it checked?
| inlineHelp | `string` | `x`  | - | Additional text related to the checkbox
| label | `string` | `x` | `''` | The label of the input
| name | `string` | `x` | `''` | The name of the input
| onChange | `(SyntheticInputEvent<HTMLInputElement>) => void` | `x` |  | Change handler
| value | `string` | `x` | `''` | The value of the input
