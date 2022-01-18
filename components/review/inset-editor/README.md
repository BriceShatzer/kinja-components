# InsetEditor ![ready](status-images/ready.svg)

An interactive editor that shows a live PREVIEW REVIEW on the right hand side while you are filling out the form on the left. It also has options for just saving the data or inserting an inset into the editor.

<!-- STORY -->

## Props

### onSubmit

Type: _(data, withInsert) => void_

Called when either the `Save review` or the `Save and insert box` button is clicked, with the form data as the first argument. The second argument tells you if the user wanted to insert the box into the editor or not.

### onCancel

Type: _() => void_

Called when the user clicks on the cancel button.

### getTypedTags

An apiclient method that fetches categories and subcategories

### storyType

The storytype used. Used for fetching the correct categories.

### imageUploader

A Kinja ImageUploadController that is going to be used for image uploading. See `image-upload` for details.

### canInsertBox

Whether to show the `Save and insert box` button. Defaults to true.

### initialValues
