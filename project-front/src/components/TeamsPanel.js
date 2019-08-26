import React, { Component } from 'react';
import CustomButton from '../components/buttons/CustomButton';
import TeamItem from './TeamItem';

class TeamsPanel extends Component {
  constructor(props) {
    super(props);
    this.goToNewTeam = this.goToNewTeam.bind(this);
  }

  goToNewTeam() {
    this.props.goToNewTeam();
  }

  render() {
    const { teams = [] } = this.props;
    return (
      <div className="teamsPanel">
        <CustomButton text="Nuevo Equipo" onClick={this.goToNewTeam} />
        {!teams.length ? (
          <span>No hay ningún equipo</span>
        ) : (
          teams.map(team => <TeamItem team={team} />)
        )}
      </div>
    );
  }
}

export default TeamsPanel;
