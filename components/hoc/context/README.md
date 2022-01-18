# KinjaMetaProvider

This component uses the [React Context API](https://reactjs.org/docs/context.html) to inject commonly accessed, read-only configuration and metadata into components nested anywhere in the component tree, without having to mess with prop drilling.
This is a thin wrapper around the Context API ensuring type safety and consistency.

<!-- STORY -->

#### Accessing `kinjaMeta` in your component

KinjaMeta is available to all components below a `KinjaMetaProvider` node, and in case of multiple providers, data will be read from the provider that's closest to the component accessing it.

Note that `kinjaMeta` will be provided to _every_ component in the rendering tree underneath the `KinjaMetaProvider`, but is only accessible to `KinjaMetaConsumer`.
The `withKinjaMeta` HOC wraps any component with a consumer, and is the preferred way to access `kinjaMeta`, but `KinjaMetaConsumer` is also exported, in case you want to use it in your component.

### Example

```javascript
// @flow
import { withKinjaMeta, KinjaMetaProvider } from '../path/to/module';
import type { KinjaMeta, KinjaMetaInjectedProps } from '../path/to/module';

// The metadata provided by the component
const kinjaMeta: KinjaMeta = {
  config: { adsEnabled: true }
};

type ChildComponentProps = KinjaMetaInjectedProps & {
	message: string
}
/*
	Basic component that relies on kinjaMeta
*/
const ChildComponent = (props: ChildComponentProps) => (
	<div>{props.kinjaMeta.config && props.kinjaMeta.config.adsEnabled? 'BUY STUFF' : null}</div>
);

/*
	Wrap ChildComponent with a KinjaMetaConsumer that'll inject kinjaMeta as a prop.
	If a component can't render without kinjaMeta, it makes sense to wrap it on export instead, like so:
	export default withKinjaMeta(MyComponent)
*/
const ChildComponentWithKinjaMeta = withKinjaMeta(ChildComponent);

const MiddleComponent = () => (
	<div>
		<span>I do nothing ¯\_(ツ)_/¯</span>
		<ChildComponentWithKinjaMeta />
	</div>
);

const app = (
	<KinjaMetaProvider value={kinjaMeta}>
		<MiddleComponent>
	</KinjaMetaProvider>
);

```
