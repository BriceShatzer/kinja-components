# DateTimePicker

DateTimePicker component to select an exact date and returns it in milliseconds. With the reset button it can be set back to the current time.

<!-- STORY -->

## DateTimePicker Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|timemillis | `number` | ✓ | - | selected time in milliseconds
|timezone | `string` | x | `America/New_York` | timezone of the selectedTime
|onDateChange | `(timemillis: number) => void` | ✓ | - | callback called when selected date has changed

## Example
see story.js for example.