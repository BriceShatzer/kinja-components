# Roundup ![ready](../../../doc/status-images/ready.svg) ![new](../../../doc/status-images/new.svg)

This component renders a Roundup blocknode.

[Storybook demo](http://localhost:8001/?selectedKind=4.%20Components%7CRoundup)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| intro | `Array<InlineNode>` |  | | Introductory text for the Roundup (not currently used)
| hideBlogInfo | `boolean` |  | `false` | Boolean that controls whether the blog will be shown along with the link (not currently used)
| items | `Array<RoundupItem>` | ✓ |  | Roundup Items

Roundup Items have the type of
```
RoundupItem
{
    link: InlineNode;
	blog: InlineNode;
}
```