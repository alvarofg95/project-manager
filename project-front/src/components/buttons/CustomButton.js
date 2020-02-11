import React from 'react';

export default ({ text, onClick, className, disabled }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${(className && className) || ''} defaultBtn`}
  >
    {text}
  </button>
);
