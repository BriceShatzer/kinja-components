# Image Upload ![under-review](status-images/under-review.svg)

Has a TextField to initiate an upload via an URL.
When a valid image url was entered this calls the onImageURLChange callback.

Has a file input field.
When a valid image was selected this calls the onImageChange callback.

<!-- STORY -->

## Props

### imageUploader

_Type: (image: URL | File) => Promise<CloudinaryResponse>_

This callback handles the actual image upload. Either by file or url.

### onChange

_Type: URL => void_

Called on successful image upload with the data got from the `imageUploader`.

### onInputChange

_Type: (image: URL | File) => void
| _Optional_

Runs on every value state.

### onUploadStarted

_Type: (image: URL | File) => void
| _Optional_

Runs when an upload started.

### value

_Type: URL
| _Optional_

Should be a valid image url, will show up in the `Textfield`.

### language

_Type: string_

For localization purposes. Can be `en` or `es`, same as for the Localized component.

### onError

_Type: ErrorResponse => void
| _Optional_

Called after the image uploader returns an error. Not called when the user enters an invalid url.
