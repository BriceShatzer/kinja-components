# Analytics

Higher order component to inject analytics triggers into components.

<!-- STORY -->

## Usage

Keep in mind, that this will only work for components that are hydrated client-side. If you need tracking on elements that will not be hydrated, see `initGaClickHandlers.js`. The latter is a newer implementation, so consider using that whenever possible.

```javascript
import Analytics from '../hoc/analytics';
import type { AnalyticsInjectedProps } from '../hoc/analytics';
const ComponentA = Analytics(Component);
```

> `ComponentA` now has a `ga` prop that is a callable function. There is also an accompanying `AnalyticsInjectedProps` type.

```javascript
const HoverNavPostList = Analytics(({
  ga,
}: AnalyticsInjectedProps) => (
// ...
  <a href={permalink} onClick={() =>
    ga('Network navigation', 'Dropdown Story Click', ...)
  }>
// ...
));
```
