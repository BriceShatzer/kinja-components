# ClickOutside

Higher order component used to track clicks that happen outside of your component.
The wrapper component gets the `handleClickOutside` prop that triggers when such a click happens.
The wrapped receives the `insideReference` prop that should be assigned to a DOM node reference. This is what defines what 'inside' is.

<!-- STORY -->

## Usage

```javascript
const ClickOutsideExample = clickOutside(({ insideReference }) => (
  <div ref={insideReference}>
		Hello
	</div>
);

ReactDOM.render(<ClickOutsideExample handleClickOutside={handler} />, node);
```
