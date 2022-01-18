# EditAdSlotActions ![ready](status-images/ready.svg)

EditAdSlotActions is a button group for the ad slot edit tool. Provide a callback prop to each button. The logic for showing and hiding the toolbar must be handled externally.

[Storybook Demo](http://localhost:8001/?selectedKind=EditAdSlotActions)

<!-- STORY -->

## Props

### onCancel void=>void
A function that will be called when a user clicks the cancel button

### onSave void=>Promise<*>
A function that will be called when a user clicks the save button. The save button will be replaced by a Saving element until the promise calls back.

### onReset void=>void
A function that will be called when a user clicks on the reset button.
