# Field ![ready](status-images/ready.svg) ![new](status-images/new.svg)

The Field component is used to wrap inputs. It provides the label, the error message, and the character counter.

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| children | `React.Node` | ✓ |  | The input(s) to wrap
| label | `string` |  |  | The input label
| error | `string` |  |  | The input error
| counter | `boolean` |  | `false` | Show the character counter?
| value | `string` |  |  | The input value (only needed for the character counter)
| limit | `number` |  |  | Character limit
| fullWidth | `boolean ` |  | `false` | Full width field (regular fields are capped at 400px)

## Usage

```
<Field label="Hello">
	<Textfield />
</Field>
```
