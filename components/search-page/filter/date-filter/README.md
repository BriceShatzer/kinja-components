
# Date Filter

 A component  what makes it able to filter out the date parameters what we want to search between. It returns on object with a `dateEnd` and `dateStart` timemillis.

 [Storybook demo](http://localhost:8001/?path=/story/4-components-search-filter--date-filter)

 <!-- STORY -->

 ## Props

 | Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| blogTheme | `blogTheme` | ✓ | `default` | Add blogTheme to the component
| defaultChecked | `string` | ✓ | - | Label of the default check radio button
| locale | `Locale` | ✓ | `en-US` | Country and language code
| onChange | `({ dateStart: number, dateEnd: number }) => void` | ✓ | - | Callback called with end and start date of the interval
| currentTimemillis | `number` | ✓ | - | Current time in milliseconds
|timezone | `string` | ✓ | `America/New_York` | timezone
