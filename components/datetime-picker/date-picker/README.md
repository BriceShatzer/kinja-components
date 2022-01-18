# DatePicker

DatePicker component for selecting dates from the calendar. On click it opens the `<Calendar>` component and handles outside click.

<!-- STORY -->

## DatePicker Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| autoGrow | `boolean` | ✓ | `true` | make the input autogrow
| blogTheme | `blogTheme` | ✓ | `default` | Add blogThemed style to the component
| isPastSelectionEnabled | `boolean` | x | - | make it able to select dates in the past years
| label | `string` | x | - | This prop will be passed down to the Textfield18 component
| onDateChange | `(dateObject: DateObject) => void` | ✓ | - | callback called when date has changed
| timemillis | `number` | ✓ | - | selected date in milliseconds
| timezone | `string` | x | `America/New_York` | timezone

## Example
see story.js for example.