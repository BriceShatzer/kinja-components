# Loading Indicator Component ![ready](status-images/ready.svg)

Can be used to communicate to the user that something is loading.
> Requires a Theme somewhere above it.

```javascript
import { Loading } from './elements/loader';


<Loading />
```

Spinner styled element is exposed, so styling directly is possible

```js
import Loading, { Spinner } from './elements/loader/load-indicator';

const MyContainer = styled.div`
  ${Spinner} {...}
`

<MyContainer>
  <Loading />
</MyContainer>
```
