# VideoAdmin ![ready](status-images/ready.svg) ![new](status-images/new.svg)

Short description of `VideoAdmin`.
What does it do?
  Responsible for the administrative management of Kinja Videos
Where does it appear on the Kinja UI?
  kinja.com/video
When and how to reuse it?
  Several components can be used in video search components and a list component for sortable, paging data
What variants does it have?
What subcomponents does it have?
  VideoList, VideoListItem

[Storybook demo](http://localhost:8001/?selectedKind=4.%20Components%7CVideoAdmin)

The `VideoPlaylistItem` is one video in a video playlist.

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| index | `number` | ✓ | | Index of the playlist item
| count | `number` | ✓ | | Overall count of the items.
| poster | `SimpleImage` | | | Video poster
| title | `text` | ✓ | | Video title
| uploadTime | `string` | ✓ | | Time the video was uploaded (as ISO string)
| onRemoveClick | `function` | ✓ | | Function to call when an item is removed
| onMoveItemClick | `function` | ✓ | | Function to call when an item is moved

<!-- STORY -->