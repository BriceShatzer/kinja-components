# Video search

<!-- STORY -->

## Video search props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|items | `Array<VideoSearchResult>` | ✓ | | item to display
|onItemClick | function | ✓ | | called when user click on button
|onSearchForVideos | function | ✓ | | called when the user search for new videos
|locale | Locale | | 'en-US' | locale for strings and time formatting

## Video search item props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|item | `VideoSearchResult` | ✓ | | item to display
|onClick | function | ✓ | | called when user click on button
|locale | Locale | | 'en-US' | locale for strings and time formatting
