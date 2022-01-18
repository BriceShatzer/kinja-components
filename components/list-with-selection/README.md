# ListWithSelection ![ready](status-images/ready.svg)

Shows a list that you can navigate with the up/down arrow keys and select with either enter or clicking on an item.

<!-- STORY -->

## Props

### children

Children you pass in will be displayed as they are, wrapped in `li`-s.

### onSelect

Type: _React$Element => void_

Called whenever the user selects an item with either mouse or Enter. Called with the child element that was selected.

### allowNavigation

Type: _Boolean_
| _Optional_

You need to provide this prop to enable navigation with the keyboard. It's not dependent on the element having focus, because in many cases you want to have another element to have the focus on the page, like a textfield.

### height

Type: _Number_
| _Optional_

Max height of the element.
