# Select ![under-review](status-images/under-review.svg)

A simple dropdown select element. On mobile, it renders as a native select element. Can display custom components as options.

_Storybook notes:_

- _The Open/Close events knob is only there to reduce noise in the action logger, it's not a property of the component._
- _Enable the Custom options knob to see a custom components as the children of the component._

<!-- STORY -->

## Props

### name

Type: _String_

An identifier for the input field. The value will appear with this key in the form data.

### value

_Optional_

The dropdown will display the currently selected item based on what value the component has. As with all controlled components, you should change the value prop after the onChange event triggers with a newly selected value, to display the change.

### onChange

Type: _V => void_

Called every time the value of the component changes, with the current value passed in.

### description

Type: _String_
| _Optional_

To be shown next to the component

### children

Type: _React.ChildrenArray<React.Element<Option<V>>>_

Any component that adheres to the Option can be embedded in the Select component. They will appear as options in a normal select element. You can read about the interface further below.

### simplified

Type: _Boolean_
| _Optional_

If provided, the component will render a mobile-friendly native select element.

### predictive

Type: _Boolean_
| _Optional_

Allows you to type in the select element when it is open, filtering the results.

### error

Type: _String_
| _Optional_

If provided, the error message will appear below the component.

### disabled

Type: _Boolean_
| _Optional_

If provided, you won't be able to change the value.

### height

Type: _Number_
| _Optional_

If provided, the option list height will be capped by this number.

### headerStyled

Type: _Boolean_
| _Optional_

Add new style to the component.

### labelUnderField

Type: _Boolean_
| _Optional_

If true, displays label underneath the `<Select>` as other input fields

## Sample usage

Here's a sample usage with the built-in default Option component as children:

```javascript
<Select name="language" onChange={handleChange}>
  <Option value="en" stringRepresentation="English" />
  <Option value="es" stringRepresentation="Spanish" />
</Select>
```

# Creating a custom Option component

Any custom component can be embedded in the Select component as long as its props object adheres to this interface:

```javascript
  value: V,
  selected?: boolean,
  stringRepresentation: string,
  emptyValue?: boolean
```

Of course it can have any other properties. The _stringRepresentation_ property is needed because it's displayed in the mobile friendly version and is used for filtering when `predictive` is enabled, but the `value` property itself can be anything. Note that _stringRepresentation_ should be unique across all options in a single select.

When `emptyValue` is set, the option is treated as representing an empty state for the component. This allows you to not have the options list filtered when this option is selected.
