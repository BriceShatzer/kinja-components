# Video Uploader

The Video Uploader module allows an editor to upload video directly from the post editor.

[Storybook demo](http://localhost:8001/?selectedKind=4.%20Components%7CVideo%20Uploader)

<!-- STORY -->

## FileSelector

A file selector with Submit and Cancel buttons.

### Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| file | `File` |  |  | Sets file when the component is mounted
| onCancel | `() => void` |  |  | Cancel callback
| onSubmit | `(File) => void` | ✓ |  | Submit callback
| title | `string` | ✓ |  | Component title to show

## VideoMetadataForm

Handles video metadata editing.

### Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| onCancel | `() => void` | ✓ |  | Cancel callback
| onSubmit | `(fields: VideoMetadataFields, captionFile: File) => void` | ✓ |  | Submit callback
| enableCaptionUpload | `boolean` |  |  |  Enables caption upload field
| isFinished | `boolean` |  |  |  Denotes whether the file uploading is finished or not
| isErrored | `boolean` |  |  | Denotes if an error occurs during upload
| message | `string` |  |  | Progress message
| blog | `string` | ✓ |  | Blog title
| storyType | `string` |  |  | Story Type name
| getPrograms | `() => Promise<Array<Program>>` | ✓ |  |  Fetches enabled programs
| onProgramError | `() => void` | ✓ |  | Handles errors during program fetching
| getVideoInfo | `() => Promise<VideoMetadataFields>` |  |  | Handles fetching of existing video metadata


## ProgressIndicator

Shows the upload progress with an animation, a progress bar and text.

### Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| onCancelClick | `() => void` |  |  | Cancel callback
| onEditClick | `() => void` |  |  | Edit callback
| onRetryClick | `() => void`|  |  | Retry callback
| isFinished | `boolean` |  | `false` |  Is the file uploaded and the video syndicated?
| isUploaded | `boolean` |  | `false` | Is the file uploaded?
| isErrored | `boolean` |  | `false` | Was there an error during upload?
| stateTransition | `boolean` |  | `true` | Show transition between states? Should be disabled when returning to a non-default state (success/error).
| message | `string` | ✓ |  | Progress message
| percent | `number` | ✓ |  | Upload progress


## UploadingAnimation

A fancy animation to show upload progress.

### Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| finished | `boolean` |  | `false` |  Is the file uploaded and the video syndicated?
| errored | `boolean` |  | `false` | Was there an error during upload?
| message | `string` |  |  | Progress message
| stateTransition | `boolean` |  | `true` | Show transition between states? Should be disabled when returning to a non-default state (success/error).