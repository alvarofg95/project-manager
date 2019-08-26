import React from 'react';

export default ({ team }) => (
  <div>
    <p>{team.name}</p>
    <span>{team.numUsers}</span>
  </div>
);
