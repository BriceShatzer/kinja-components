# Elements ![ready](status-images/ready.svg)

<!-- STORY -->

## Media

Elements that help with rendering media, both animated and not. All of these elements are wrapped in the [OnScreen HOC](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/components/hoc/on-screen/index.js) to allow optional lazy-loading, disabled by the `noLazy` prop.

**Note**: if you know that the image you are rendering is an animated gif, [use a video component](https://rigor.com/blog/2015/12/optimizing-animated-gifs-with-html5-video)!

### Item Group

An item group component with one selected element. Takes its own children and wraps them into the passed `htmlElement` props, and passes them the `childrenProps` properties. On changing it calls the `onChange` method with the selected element's value.

```javascript
<ItemGroup htmlElement='div' childrenProps={{ small: true }} {...props} >
  {props.children}
</ItemGroup>
```

### LazyResponsiveImage

A `srcSet` resolution responsive image component. Accepts a Cloudinary id. Example in [Storybook](http://localhost:8001/?selectedKind=Elements&selectedStory=Image%20%28srcset%20responsive%29).

```javascript
<LazyResponsiveImage id='gddzmaj7aqo4q5sra51l' />
```

### Video

A lazy-loaded or non lazy-loaded video component. Accepts a Cloudinary id or explicit source props. Default behavior is a looping, muted video akin to a gif. Example in [Storybook](http://localhost:8001/?selectedKind=Elements&selectedStory=Video%20%28lazy%29).

```javascript
<Video id='gddzmaj7aqo4q5sra51l' />
```

## State

### Loading

An animated "Loading" component. Example in [Storybook.](http://localhost:8001/?selectedKind=Elements&selectedStory=Loading)

```javascript
<Loading />
```

### Saving

Simple saving state component. Accepts `isSaving` prop to determine state to display and `language` for the associated text. Example in [Storybook](http://localhost:8001/?knob-Saving=true&selectedKind=Elements&selectedStory=Saving).

```javascript
<Saving isSaving />
```

## Organization

### Tabs

An unordered list extending the ButtonGroup component. Example in [Storybook](http://localhost:8001/?selectedKind=Elements&selectedStory=Tabs).

```javascript
<Tabs onChange="">
  <TabItem isHidden value="staff" label="Staff" selected />
  <TabItem count="55" value="communitiy" label="Community" />
  <TabItem count="105" value="pending" label="Pending" />
</Tabs>
```

### TabItem

A list item component. Example in [Storybook](http://localhost:8001/?selectedKind=Elements&selectedStory=Tabs).

```javascript
<TabItem isHidden value="staff" label="Staff" selected />
```

### Link

A link element, allowing GA props to be hydrated into an actual link on client.

```javascript
<Link href="kinja.com" event={['send','event','category','action','label','value']} />
```
