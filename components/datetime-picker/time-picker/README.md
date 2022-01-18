# TimePicker

TimePicker component for picking hour, minute, and meridiem and returns them in an object.

<!-- STORY -->

## TimePicker Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|locale | `Locale` | x | `en-US` | language for translations
|timemillis | `number` | ✓ | - | selected time in milliseconds
|onTimeChange | `number` | ✓ | - | callback called when selected time has changed
|timezone | `string` | x | `America/New_York` | timezone of the selectedTime

## Example
see story.js for example.