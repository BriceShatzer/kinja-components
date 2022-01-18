# AMPMSwitcher

AMPMSwitcher component has two states: `am` | `pm`. On click it set the state with the next one and returns it.

<!-- STORY -->

## AMPMSwitcher Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|onChange | `(meridiem: string) => void` | ✓ | - | callback called when component is clicked
|timemillis | `number` | ✓ | - | selected date in milliseconds
|timezone | `string` | x | `America/New_York` | timezone

## Example
see story.js for example.