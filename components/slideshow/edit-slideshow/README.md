# EditSlideshow ![ready](status-images/ready.svg)

Here you can rearrange and remove images from a slideshow, as well as changing the aspect ratio of all images.
For the drag and drop functionality, uses the `react-sortable-hoc` component. [GitHub](https://github.com/clauderic/react-sortable-hoc)

<!-- STORY -->

## Props

### items

Type: _Array<Image>_

The items in the slideshow

### aspectRatio

Type: _string_

The aspect ratio of the slideshow. Possible values are `16:9` and `3:2`.

### onCancel

Type: _() => void_

Event handler for when the user clicks the cancel button

### onSubmit

Type: _{ items: Array<Image>, aspectRatio: string } => void_

Event handler for when the user clicks the submit button. Has all the changes to the slideshow, you need to save the changes.
