# Recent Searches

It gets a list of keywords and returns that string by clicking on the item. By clicking of the clear button it calls the `onClear` callback.

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| keywords | `Array<string>` | ✓ | - | A list of keywords.
| locale | `Locale` | ✓ | `en-US` | Country and language code.
| onClear | `() => void` | ✓ | - | This called when the `Rotate` (clear) icon was clicked
| onClick | `(keyword: string) => void` | ✓ | - | This will be called on a keyword click.
| theme | `BlogThemeName` | ✓ | - | This will theme the keywords and the border-color.
