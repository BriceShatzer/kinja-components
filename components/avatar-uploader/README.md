# AvatarUploader

A kinja component to upload image for avatar.

<!-- STORY -->

## AvatarUploader Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| imageUploader | `Array<User>` | ✓ | - | a Kinja ImageUploadController that is going to be used for image uploading
| locale | `string` | x | `en-US` | language for translations
| onChange | `ImageType => void` | ✓ | - | will be called on successful upload
| onError | `ErrorResponse => void` | x | - | will be called on upload failure

## Example
see story.js for example.