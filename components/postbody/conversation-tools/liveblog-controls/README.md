# LiveblogControls

LiveblogControls component for setting the liveblog status on the Liveblog permalink.

<!-- STORY -->

## LiveblogControls Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| discussionSetting | `DiscussionSettings` | ✓ | - | component will be set based on this prop
| locale | `Locale` | ✓ | `en-US` | language for translations
| onChange | `onChange: (LiveblogControlsStatus, SortType) => void;` | ✓ | - | called when component has changed
| onReloadClick | `() => void` | ✓ | - | called when the chevron icon was clicked in the Alert

## Example
see story.js for example.