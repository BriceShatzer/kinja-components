# Save Indicator Component ![ready](status-images/ready.svg)

Can be used to communicate to the user that something is saving.
Can toggle between a saving and a saved state with the `isSaving` prop.
> Requires a Theme somewhere above it.

```javascript
import { Spinner } from './elements/loader';

<Spinner isSaving={saveIsInProgress} />
```
