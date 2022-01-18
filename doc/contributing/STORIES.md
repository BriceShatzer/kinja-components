# Writing Stories ![ready](status-images/ready.svg)

We write READMEs and Stories to document Kinja components. They are organised and displayed in Storybook.

A story is a visual test case for a component. It shows how a component looks, and describes how it works.
When writing a story, show off as many use cases and states as possible. You can do that by using [Knobs](https://github.com/storybooks/storybook/tree/master/addons/knobs), or generating all the permutations of the props of the component and showing them all in a single story. You can find examples for both approaches.
Use actions when possible to show off interactions with the component.
To learn more about Storybook, [read the introduction here](https://storybook.js.org/basics/introduction/) and the guide on [writing stories here](https://getstorybook.io/docs/react-storybook/basics/writing-stories).

## Storybook Structure

We organise Stories into atomic categories in Storybook:
1. **Guides** like the one you're reading right now.
2. **Styles & Utilities** that apply to / are meant to be used with other components. Eg. Colors, Typography or Translation.
3. **Elements** simple, frequently reused components like Icons or Buttons.
4. **Components** more complicated things with a specific use case like Blog Header or Slideshow.

To put stories into these categories use `|` and `/` separators:
```js
storiesOf('3. Elements|Branding/Blog Avatar', module)...
```

## Storybook Addons

We're using the following [addons](https://storybook.js.org/addons/introduction/) for storybook:

- [Actions](https://github.com/storybooks/storybook/tree/master/addons/actions)
With actions, you can inspect events related to your components. This is pretty neat when you are manually testing your components.
Also, you can think of this as a way to document events in your components.

- [Knobs](https://github.com/storybooks/storybook/tree/master/addons/knobs)
Knobs allow you to edit React props dynamically using the Storybook UI.
You can also use Knobs as dynamic variables inside your stories.

- [Viewport](https://github.com/storybooks/storybook/tree/master/addons/viewport)
The Viewport Addon allows your stories to be displayed in different sizes and layouts in Storybook. This helps build responsive components inside of Storybook.

- [Readme](https://github.com/tuchk4/storybook-readme)
This addon puts readme text around stories so storybook can function as component docs.

## Tips for themed components

If you want to add a selector knob for a blog property, use `blogGroup`. E.g. [RecentVideo component](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/components/recent-video/story.js)

```js
import { blogGroup } from 'base-storybook';

storiesOf('YOUR_COMPONENT', module)
	.add('default', () => {
		<YOUR_COMPONENT
			blogName={blogGroup()}
		/>
	});
```

If you want to display each blog property variant side by side, use `ThemeDecorator`. E.g. [BlogAvatar component](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/components/blog-avatar/story.js)

```js
import { ThemeDecorator } from 'base-storybook';

storiesOf('YOUR_COMPONENT', module)
	.add('default', () => {
		<ThemeDecorator>
			{blog =>
				<YOUR_COMPONENT
					key={blog}
					blog={blog}
				/>
			}
		</ThemeDecorator>
	});
```

If your component doesn't have a blog prop, but you want to display each theme variant in a grid, use `withThemes`. E.g. [PullQuote component](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/components/postbody/pull-quote/story.js)

```js
import { withThemes } from 'base-storybook';

storiesOf('YOUR_COMPONENT', module)
	.addDecorator(withThemes)
	.add('default', () => {
		<YOUR_COMPONENT/>
	});
```

## Testing stories

It is not expected to use flow in stories, but all stories have to pass our eslint tests.

## Learn more

- [Coding Guidelines](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/CODING.md)
- [Creating Components](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/CREATING.md)
- [Localizing Components](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/LOCALIZING.md)
- [Styling Components](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/STYLING.md)
- [Testing](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/TESTING.md)
- [Writing READMEs](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/READMES.md)
- [Generating SVG Sets](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/GENERATING.md)
