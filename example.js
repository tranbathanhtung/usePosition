import React, { useRef } from 'react';
import { render } from 'react-dom';
import usePosition from './';

function App() {
  let ref = useRef(null);
  let { left, top } = usePosition(ref);
  return (
    <p ref={ref}>Hello Hooks: {JSON.stringify({left, top})}</p>
  );
}

render(<App />, window.root);
