# MetaTime

Meta time element what renders time from timemillis and timezone in a proper format.

<!-- STORY -->

## MetaTime Props
| Name        | Type      | Required | Default value | Description                                                   |
| ----------- | --------- | -------- | ------------- | ------------------------------------------------------------- |
| millis      | `number`  | ✓        | -             | publishing time in milliseconds                               |
| permalink   | `string`  | ✓        | -             | Post permalink                                                |
| pageType    | `PageType`| ✓        | -             | tracking purposes  |
| postId      | `PostId`  | ✓        | -             | tracking purposes  |
| index       | `number`  | ✓        | -             | tracking purposes  |
| isScheduled | `boolean` | x        | `false`       | add a `Scheduled:` label and different style to the component |
| locale      | `Locale`  | x        | `en-US`       | language for translations                                     |
| timezone    | `string`  | x        | -             | it's needed to display the proper time in every timezones, default is implied from context    |
| isDeals     | `boolean` | x        | `false`       | tracking purposes  |
| isExternalPost | `boolean` | x     | `false`       | tracking purposes  |

## Example
 see story.js for example.
