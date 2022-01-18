# SpliceEditor

SpliceEditor component to splice posts to a different blog or even multiple ones at the same time. With the `FolderSelector` we can pick the blogs where do we wanna share the post to and with the `DatetimePicker` we can set the `repostTime`. With the embiggen button we can set the spliced post's embiggen property what will also be passed when the Share button was clicked. At least one blog should be selected for making the share available.

<!-- STORY -->

## SpliceEditor Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|authors | `Array<User>` | ✓ | - | authors of the post
|blog | `Blog` | ✓ | - | blog object where we are splicing from
|inModal | `boolean` | x | `true` | component will be returned in a fullScreen modal
|lastSharedBlogs | `Array<LastSharedBlogs>` | x | - | this list will be passed down to the LastSharedPanel
|levels | `Array<level>` | ✓ | - | this data will be passed to the `FolderSelector`
|locale | `string` | x | `en-US` | language for translations
|onCancel | `() => void` | ✓ | - | this will be called when the Cancel button was clicked
|onShare | `(state: State) => void` | ✓ | - | component state will be passed to the callback when shared button was clicked
|onUnshare | `(blogId: string, displayName: string) => void` | ✓ | - | callback called when element is removed from the LastSharedPanel
|pageType | `PageType` | x | `permalink` | pageType where we are splicing from
|post | `Post` | ✓ | - | Post object
|timemillis | `number` | ✓ | - | selected time in milliseconds
|timezone | `string` | ✓ | `America/New_York` | timezone where the user is

## Example
see story.js for example.