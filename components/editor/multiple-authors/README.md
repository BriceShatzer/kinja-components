# MultipleAuthors ![under-review](status-images/under-review.svg)

We can create a list of names by adding new ones from a dropdown or deleting existing ones. We can select authors by either clicking on them or using `Enter`, `RightArrow`, or `,` keys. To remove a name from the created list just click on it or use `Backspace` key when the input field is both empty and focused.

The expected data structure for the Author is:

```javascript
export type Author = {
	avatar: Avatar,
	displayName: string,
	id: string,
	screenName: string
};
```

<!-- STORY -->

## Props

### authors

type: _Array_ [required]

Array of Author objects what are rendering into the list. Must contains at least one element.

### authorsList

type: _Array_ [required]

Array of Author objects what will appear in the list above the input field.

### onChange

Type: _Array<Author> => void_

Called when the *authors* is changed, added new or removed existing authors.

### autofocus

Type: _Boolean_

When set to `true` the `AuthorInput` will auto focus after mount.
