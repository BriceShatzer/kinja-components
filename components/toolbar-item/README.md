# ToolbarItem ![ready](status-images/ready.svg)

The ToolbarItem is used in different types of tool bars to display various types of actionable items

<!-- STORY -->

## Props

The props for `ToolbarItem` are the following:

### title

Type: string

The title is used as a unique identifier as well as the text shown when you hover over the icon

### showtitle

Type: boolean | _Optional_

Shows title in a <p> tag under the icon

### icon

Type: string

Name of the icon that should be shown

### onClick

type: function

Will be triggered on click if the element is not disabled

### disabled

Type: boolean | _Optional_

When disabled, the icon appears greyed out and won't trigger click events

### active

Type: boolean | _Optional_

When tagged as active, the icon appears in blue
