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
  <button
    onClick={onClick}
    className={`${(className && className) || ''} defaultBtn`}
    style={{
      backgroundColor: backgroundColor,
      height: height,
      fontSize: fontSize,
      borderRadius: borderRadius,
      border: border === false ? 'none' : ''
    }}
  >
    {text}
  </button>
);
