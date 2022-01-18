# ExpandableContainer ![ready](status-images/ready.svg) ![new](status-images/new.svg)

A simple expanding container which takes content as its children with an expanding CTA.

[Storybook demo](http://localhost:8001/?selectedKind=4.%20Components%7CExpandableContainer)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| truncateLines | `number` | | | Number of lines to truncate.
| ExpandButton | `component` |  | | Clickable component to expand content.

## Example

```jsx
  <ExpandableContainer
    truncateLines={13}
    ExpandButton={({ onClick }) => (
      <Button
        halfwidth
        label="Continue reading"
        margin='0 25%'
        onClick={onClick}
        small
      />
    )}
  >
    <div dangerouslySetInnerHtml={{ __html: '...' }}> />
  </ExpandableContainer>
```

The above will render:

```html
<div class="expandable-container__PostCutOff-sc-1xy34fw-1 ixaHTU">
  <div class="expandable-container__TruncatedContainer-sc-1xy34fw-0 kupsKQ">
    <div>
      <div class="js_post-content permalink-post__PermalinkPostWrapper-r43lxo-0 dnmdyZ">
        ...
      </div>
      <div class="expandable-container__CutOff-sc-1xy34fw-2 fnypqi">
        <button class="Button__ButtonWrapper-j48i5d-2 hAdxez">
          <div class="Button__ButtonInner-j48i5d-1 eirIyU">
            <span class="Button__Label-j48i5d-0 kAWzxD">Continue reading</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
```
