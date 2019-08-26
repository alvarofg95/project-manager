import React, { Component } from 'react';
import postToAPI from '../utils/postToAPI';
import TEAMS_QUERY from '../queries/teams.query';
import TeamsPanel from '../components/TeamsPanel';

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };

    this.goToNewTeam = this.goToNewTeam.bind(this);
  }

  componentWillMount() {
    postToAPI(TEAMS_QUERY).then(res => {
      console.log({ res });
      if (res && res.data && res.data.teams) {
        this.setState({ teams: res.data.teams });
      }
    });
  }

  goToNewTeam() {
    if (this.props.history) {
      this.props.history.push('/new-team');
    }
  }

  render() {
    console.log({ teams: this.state.teams, props: this.props });
    return <TeamsPanel teams={this.state.teams} goToNewTeam={this.goToNewTeam} />;
  }
}

export default Teams;
