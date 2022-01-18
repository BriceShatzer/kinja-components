# Video player

<!-- STORY -->

## Video player props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| muted | `boolean` | | | start video muted
| autoplay | `string|boolean` | | | autoplay settings
| controls | `boolean` | | | show or hide video controls
| width | `number` | ✓ | | video width
| height | `number` | ✓ | | video height
| poster | `string` | | | video poster image, thumbnail
| sources | `Array<VideoSource>` | ✓ | | video sources, documentation TBD
| adTagUrl | `string` | | | ad tag url, documentation TBD

For detailed description of each option of video.js, please see https://docs.videojs.com/tutorial-options.html
