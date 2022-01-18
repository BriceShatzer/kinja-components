
# SearchBar

The SearchBar component returns the input's value when the button is clicked or `Enter` is pressed.
It also forces focus on its input element on its mounting phase.


## Props

### typeahead

type: _boolean_
| _Optional_
| default: _false_

Determines the behavior of the component. Typeahead search for terms as you type. Non typeahead one is waiting for click or enter.

### placeholder

type: _string_
| _Optional_

Optional placeholder for the input field.

### onSearch

type: _(value: string) => void_
| _Optional_

Prop is called with the input's value if the button is clicked or `Enter` is pressed.

### isEmptySearchField

type: _boolean_
| _Optional_

If `true` state's value will be set to empty string.


```javascript
<SearchBar typeahead onSearch={this.props.onSearch} placeholder={'Search Published Posts'} />
```