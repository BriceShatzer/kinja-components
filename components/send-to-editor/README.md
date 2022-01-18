# Send to Editors ![ready](status-images/ready.svg)

This is the "send to editor" form as shown for freelancers in mantle.
Allow freelancers to send their stories to the copy editor workflow.
Has a `ButtonGroup` to set the status.
Has a `Textarea` for the notes.

<!-- STORY -->

## Props

### initialValues

type: _{ notes: string }_

Overwrites the default state.

### onSubmit

Type: _(DraftPostDetails) => void_

Called when the user clicks the Submit button with the data from the form (`notes` and `status`).

### onCancel

Type: _() => void_

Called when the user clicks on the cancel button.

### language

Type: _en | es | hu_

For localization purposes.
