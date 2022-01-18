# Page layout ![ready](status-images/ready.svg)

Main kinja container housing layout components like the sidebar and the main content area

<!-- STORY -->

# Page

Wrapper for Main and Sidebar components

## Props

### featured

Type: _boolean_

Set if the page is a featured page, like a featured post

## Example

```jsx
<Page>
	<div>
		<h1>GitHub, Struck by Record-Breaking DDoS, Walks It Off</h1>
		{Paragraph}
	</div>
</Page>
```

# Main

Container for main content if page is not a centered page (e.g. special section or editor)

# Sidebar

Container for sidebar modules.

# HorizontalAdContainer

## Props

### position

Type: _string_, 'top' | 'center' | 'bottom'

Where is the ad container is positioned vertically on the page

### mobileAd

Type: _component_

Ad to be display on mobile screens

### desktopAd

Type: _component_

Ad to be display on desktop screens

## Example
```jsx
<HorizontalAdContainer
	position='center'
	desktopAd={
		<img src="https://tpc.googlesyndication.com/simgad/18175599460137699203"/>
	}
	mobileAd={
		<img src="https://tpc.googlesyndication.com/simgad/3829683368278582804"/>
	}
/>
```
