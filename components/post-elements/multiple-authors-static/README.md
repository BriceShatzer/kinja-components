# MultipleAuthorsStatic

This component is a non-editable version of the multiple authors component in the editor. Use the same style and renders user's displayName.

<!-- STORY -->

## Props

### authors

Type: _Array<User>_

List of User (Author) objects.

### byline

Type: _string_
| _Optional_

When set this will be shown instead of the actual authors.

### index

Type: _number_

Index of the post in the stream, used for analytics.

### pageType

Type: _string_

This pageType string used by analytics.
Should be cleaned up after the analytics refactor.

### post

Type: _Post_

Only used for analytics needs (`permalinkRedirect` and `isDeals`).
Should be cleaned up after the analytics refactor.
