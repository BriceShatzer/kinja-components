# AuthorBio ![ready](status-images/ready.svg) ![new](status-images/new.svg)

Static component that displays the authors of a post.

[Storybook demo](http://localhost:8001/?selectedKind=4.%20Components%7CAuthorBio)

<!-- STORY -->

## Props

### authors

Type: _Array [required]_

An array of authors who contributed to post. An author object consists of the following data:

```
type author = {
	id: string,
	screenName: string,
	displayName: string,
	status: UserStatus,
	isSuperuser: boolean,
	avatar: SimpleImageJSON
}
```

### isAmp

Type: _Boolean [required]_

Value determining if an amp page will load.

### authorUserProperties

Type: _Array [required]_

Array of property objects that define what an author will display in their bio. 
A property Object follows the format below:
