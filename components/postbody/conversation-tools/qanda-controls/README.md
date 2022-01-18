# QAndAControls

QAndAControls component for setting the q&a status on the Q & A permalink.

<!-- STORY -->

## Q&QAndAControls Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| avatarUploaderProps | `AvatarUploaderProps` | ✓ | - | passed down to the modal
| discussionSetting | `DiscussionSettings` | ✓ | - | component will be set based on this prop
| locale | `Locale` | ✓ | `en-US` | language for translations
| onChange | `(status: DiscussionStatus, sort: SortType) => void` | ✓ | - | called when component has changed
| onConversationButtonClick | `() => void` | ✓ | - | called when Ask a question button was clicked
| onModalSubmit | `SubmitType => Promise<*>` | ✓ | - | called when modal was submitted
| onReloadClick | `() => void` | ✓ | - | called when the chevron icon was clicked in the Alert
| onRevokeInvite | `string => void` | ✓ | - | called with screenName of user
| participants | `Array<Participant | SubmitType>,` | x | - | list of participants
| shouldScroll | `boolean` | x | - | if true after render the page scrolls down to the element

## Example
see story.js for example.