# Toggle

Higher order component used to toggle between states.

<!-- STORY -->

## Usage

### Toggle between two states
```javascript
const ToggleExample = Toggle(({isOpen, toggle}) =>
  (isOpen ?
    <button onClick={toggle}>Show more</button> :
    <p>More is being shown <button onClick={toggle}>Hide</button></p>
  ));
```

### Trigger toggle when clicking outside of component

In this case you need to provide information about what is considered 'inside' the component, by passing in the `insideReference` property to `ref` on a DOM node.

```javascript
const ToggleExample = Toggle(({isOpen, toggle, insideReference}) =>
  (isOpen ?
    <button onClick={toggle} ref={insideReference}>Show more</button> :
    <p ref={insideReference}>More is being shown <button onClick={toggle}>Hide</button></p>
  )
, { isOutsideClickEnabled: true });
```


### Render this component with default `isOpen`

The component will be rendered default `isOpen`, by passing `isDefaultOpen: true` prop to it

##### example
```
export default Toggle(ReactComponent, { isDefaultOpen: true });
```
