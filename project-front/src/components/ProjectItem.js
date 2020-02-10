import React from 'react';

export default () => (
  <div className="projectItem">
    <h3>Movistar Money Colombia</h3>
    <div className="projectStatus">
      <div className="projectTeam">
        <img src={require('../assets/icons/team.svg')} />
        <span>12</span>
      </div>
      <div className="projectTeam">
        <img src={require('../assets/icons/list.svg')} />
        <span>12</span>
      </div>
      <div className="projectTeam">
        <img src={require('../assets/icons/chart.svg')} />
        <span>50%</span>
      </div>
    </div>
  </div>
);
