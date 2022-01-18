# TimeBox

TimeBox component for picking hour and minute and returns them in an object.

<!-- STORY -->

## TimeBox Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|locale | `Locale` | x | `en-US` | language for translations
|timemillis | `number` | ✓ | - | selected time in milliseconds
|timezone | `string` | x | `America/New_York` | timezone of the selectedTime
|onTimeChange | `(timeObject: TimeObject) => void` | ✓ | - | callback called when selected time has changed

## Example
see story.js for example.