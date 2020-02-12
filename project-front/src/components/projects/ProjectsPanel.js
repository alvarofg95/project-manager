import React from 'react';
import ProjectItem from './ProjectItem';
import '../../style/projects.scss';

const array = [1, 2, 3, 4, 5];

export default () => (
  <div id="projectsContainer">
    {array.map((key, index) => (
      <ProjectItem key={`key${index}`} />
    ))}
  </div>
);
