# Popular Search

It gets a list of keywords and returns that string by clicking on the item.

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| blogName | `string` | ✓ | - | Blogname where the keywords are from.
| keywords | `Array<string>` | ✓ | - | A list of keywords.
| locale | `Locale` | ✓ | `en-US` | Country and language code.
| onClick | `(keyword: string) => void` | ✓ | - | This will be called on a keyword click.
| theme | `BlogThemeName` | ✓ | - | This will theme the keywords and the border-color.
