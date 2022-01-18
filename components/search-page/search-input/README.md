# Search Controller

Main component for handling user input, word suggestions and fetching search results. The controller (`searchCtrl.js`) itself handles external API calls and props for child components. `search.js` is a static renderer for the area and can be used in static rendering independently. In this case you have to submit props to this component and implement external methods.

<!-- STORY -->

## Controller Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| inputValue | `string` | x | | Direct setting for text input
| externalAPI | `ExternalAPI` | x | | Api methods
| suggestions | `Array` | x | | Option for externally feeding the component with suggestions

## Static Renderer Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| inputValue | `string` | ✓ | | Direct setting for text input
| suggestions | `Array` | ✓ | | Renders the input without submit button
| onTyping | `(string) => void` | ✓ | | Callback for typeahead suggestions
| onManualSearch | `(string) => void` | ✓ | | Callback for manually submitted queries
| onSuggestionSelected | `(string) => Promise` | ✓ | | Callback for the controller with the selected suggestion
| clearSuggestions | `() => void` | ✓ | | Callback for the controller to clear out all suggestions

## Search Bar Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| inputValue | `string` | x | | Direct setting for text input
| typeahead | `boolean` | ✓ | | Renders the input without submit button
| placeholder | `string` | ✓ | | Placeholder text
| onSearch | `(string) => void` | ✓ | | Callback for typeahead suggestions
| onManualSearch | `(string) => void` | ✓ | | Callback for manually submitted queries

## Suggestions Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| trigger | `any` | x | | Element to watch for. Parent of the dropdown
| suggestions | `Array` | ✓ | | Suggestions to display in the dropdown
| handleSelectedSuggestion | `(string) => void` | ✓ | | Callback for the controller with the selected suggestion
| clearSuggestions | `() => void` | ✓ | | Callback for the controller to clear out all suggestions
