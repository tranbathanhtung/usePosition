# `@rehooks/usePosition`

> React hook for ...

> **Note:** This is using the new [React Hooks API Proposal](https://reactjs.org/docs/hooks-intro.html)
> which is subject to change until React 16.7 final.
>
> You'll need to install `react`, `react-dom`, etc at `^16.7.0-alpha.0`

## Install

```sh
yarn add @rehooks/usePosition
```

## Usage

```js
import { useRef } from 'react';
import usePosition from '@rehooks/usePosition';

function MyComponent() {
  let ref = useRef(null);
  let { left, top } = usePosition(ref);
  return (
    <p ref={ref}>Hello Hooks: {JSON.stringify({left, top})}</p>
  );
}
```
