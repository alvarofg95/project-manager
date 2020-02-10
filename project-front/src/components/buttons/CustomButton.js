import React from 'react';

export default ({
  text,
  onClick,
  className,
  backgroundColor,
  height,
  fontSize,
  borderRadius,
  border
}) => (
  <button onClick={onClick} className={`${(className && className) || ''} defaultBtn`}>
    {text}
  </button>
);
