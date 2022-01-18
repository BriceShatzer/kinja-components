# Review Box ![ready](status-images/ready.svg)

[Storybook Demo](http://localhost:8001/?selectedKind=Review&selectedStory=Review%20Box)

<!-- STORY -->

## Props

### alignment

Type: _'Center'_ | _'Left'_ | _'Fullbleed'_

### categoryData

Type: _TypedTagData_

### subcategoryData

Type: _TypedTagData_

### storyType

Type: _StoryType_

### text

Type: _Array_ [required]

It's an array with object elements what contain the review data's label and value as well.

### image

Type: _HTMLImageElement | React$Element<any>_

Accepts an image element or any React component.
Image ratio should be 9:16.

### score

Type: _string_

Accepts any variations of the five grade system from *A+* to *F*.

### title

Type: _string_ [required]

A string will appear as title of the box.
