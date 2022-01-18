# Content Summary ![ready](status-images/ready.svg)

Display a summary for a piece of content, such as, story type boilerplate.

[Demo](http://localhost:8001/?selectedKind=ContentSummary)

<!-- STORY -->

## Props

### image

Type: _Object_
Default: _null_

An `Image` object containing a Cloudinary ID as `id` and file format as `format`

### summary

Type: _String_
Default: _null_

Summary to display alongside `image` or `title`

Accepts `Markdown`, parsed by `snarkdown`

### title

Type: _String_
Default: _null_

Title to display in place of `image` or above `summary`

### labelClassName (optional)

Type: _String_
Default: _null_

### prevPermalink (optional)

Type: _String_
Default: _null_

URL for 'Previous' link

### nextPermalink (optional)

Type: _String_
Default: _null_

URL for 'Next' link

### blogId (optional)

Type: _Number_
Default: _null_

blog ID associated with summary, for canonical linking

## Example

```jsx
<ContentSummary
  image={{ id: 'vwppylx89l4ubmp3xcjc', format: 'jpg' }}
  title='The Salty Waitress'
  summary=`Are you a server's **worst** nightmare without even knowing it?`
  labelClassName='textbox-shadow'
  nextPermalink={null}
  prevPermalink='https://thetakeout.com/ask-the-salty-waitress-how-do-i-ask-for-a-restaurant-s-1826265906'
  blogId={1636140418}
/>
```
