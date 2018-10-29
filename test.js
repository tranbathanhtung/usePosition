'use strict';
let test = require('ava');
let { createElement: h, useRef } = require('react');
let ReactTestRenderer = require('react-test-renderer');
let usePosition = require('./');

function render(val) {
  return ReactTestRenderer.create(val);
}

test(t => {
  function Component() {
    let ref = useRef(null);
    let { left, top } = usePosition(ref);
    return h('p', {ref: ref, top, left}, 'Hello Hooks');
  }

  let component = render(h(Component));
  t.is(component.toJSON().props.top, 0);
  t.is(component.toJSON().props.left, 0);
});
