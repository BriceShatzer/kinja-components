# Excerpt

Excerpt component what uses the `<BlockNodeList>` component to render the text.

<!-- STORY -->

## Props

### blog

Type: _Blog_
| _Optional_

Blog string used for the `<ContextProvider>` to have blog theme colored links.

### postBody

Type: _Array<BlockNode>_

List of blocknodes what will be pass to the `<BlockNodeList>`.

## Sample usage

```javascript
<Excerpt blog="theonion" postBody={post.body} />;
```