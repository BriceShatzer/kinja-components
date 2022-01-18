# Calendar

Calendar component for datepicking, returns the selected date in milliseconds.

<!-- STORY -->

## Calendar Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|blogTheme | `blogTheme` | ✓ | `default` | Add blogThemed style to the component
|onDateChange | `(date: number) => void` | ✓ | - | callback called when selected date has changed
|timemillis | `number` | ✓ | - | selected date in milliseconds
|timezone | `string` | x | `America/New_York` | timezone

## Example
see story.js for example.