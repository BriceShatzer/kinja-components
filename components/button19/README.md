# Button19 ![ready](status-images/ready.svg)![new](status-images/new.svg)

The `Button19` component renders a button. It supersedes the deprecated `Button` component.

Buttons can have an icon, a label, or both. Use both whenever possible.

If you wrap the button in a blog theme, it will get the blog's colors.

There are also special variants of `Button19`: `AmazonButton19`, `FacebookButton19` and `TwitterButton19`. These are separate components. They don't conform to the theme they are in and have their own colors instead.

[Storybook Demo](http://localhost:8001/?selectedKind=Buttons&selectedStory=Basic%20Buttons)

<!-- STORY -->

## Props

### variant

There are several variants of buttons:
* `primary` buttons have the most visual weight. Use these for the most important actions on a page.
* `secondary` buttons are less prominent, they should be used for the less important actions.
* `tertiary` buttons are the least prominent. Use these for the least used actions, or in toolbars.

There are also dark versions of the above variants, called `primaryDark`, `secondaryDark` and `tertiaryDark`. Use these on dark backgrounds.

There are also two special variants, `toggleInactive` and `toggleActive`. Use these for buttons in a toolbar that can be toggled on or off.

### tag
Type: 'a' | 'button'

Pass an 'a' to render button as a link. Tag is 'button' by default.
Potential tag type extension is possible in the future.

### icon

Type: _Icon19_

Pass an `Icon19` to the button to display an icon.

### label

Type: _string_

The button's label.

### labelPosition

Type: _'after'_ | _'before'_

If there is an icon prop, this prop can set the label position. Default is `after`.

### isSmall

Type: _Boolean_

Make the button smaller. Use this in cramped spaces.

### disabled

Type: _Boolean_

Sets the button to be disabled.
