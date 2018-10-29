'use strict';
let { useState, useLayoutEffect } = require('react');

function getStyle(el, styleName) {
  return getComputedStyle(el)[styleName];
};

function getOffset(el) {
  if (!el) {
    return {top: 0, left: 0}
  }
  const rect = el.getBoundingClientRect();
  const doc = el.ownerDocument;
  if (!doc) throw new Error('Unexpectedly missing <document>.');
  const win = doc.defaultView || doc.parentWindow;

  const winX = (win.pageXOffset !== undefined)
  ? win.pageXOffset
  : (doc.documentElement || doc.body.parentNode || doc.body).scrollLeft;
  const winY = (win.pageYOffset !== undefined)
  ? win.pageYOffset
  : (doc.documentElement || doc.body.parentNode || doc.body).scrollTop;

  return {
    top: rect.top + winX,
    left: rect.left + winY,
  };
};

function getPosition(el) {
  if (!el) {
    return {top: 0, left: 0 };
  }
  let offset = getOffset(el);
  let parentOffset = {top: 0, left: 0 };
  const marginTop = parseInt(getStyle(el, 'marginTop')) || 0;
  const marginLeft = parseInt(getStyle(el, 'marginLeft')) || 0;

  if (getStyle(el, 'position') === 'fixed') {
    offset = el.getBoundingClientRect();
  } else {
    const doc = el.ownerDocument;

    let offsetParent = el.offsetParent || doc.documentElement;

    while (offsetParent &&
          (offsetParent === doc.body || offsetParent === doc.documentElement)
    ) {
      offsetParent = offsetParent.parentNode;
    }

    if (offsetParent && offsetParent !== el && offsetParent.nodeType === 1) {
      parentOffset = getOffset(offsetParent);
      parentOffset.top += parseInt(getStyle(offsetParent, 'borderTopWidth')) || 0;
      parentOffset.left += parseInt(getStyle(offsetParent, 'borderLeftWidth')) || 0;
    }
  }

  return {
    top: offset.top - parentOffset.top - marginTop,
    left: offset.left - parentOffset.left - marginLeft,
  };
}

function usePosition(ref) {
  let { top, left } = getPosition(ref.current);
  let [ElementPosition, setElementPosition ] = useState({
    top: top,
    left: left,
  });

  function handleChangePosition() {
    if (ref && ref.current) {
      setElementPosition(getPosition(ref.current))
    }
  }

  useLayoutEffect(() => {
    handleChangePosition();
    window.addEventListener('resize', handleChangePosition);

    return () => {
      window.removeEventListener('resize', handleChangePosition);
    }
  }, [ref])

  return ElementPosition;
};

module.exports = usePosition;
