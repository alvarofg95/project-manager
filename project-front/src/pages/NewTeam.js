import React, { Component } from 'react';
import TextInput from '../components/inputs/TextInput';
import CustomButton from '../components/buttons/CustomButton';
import postToAPI from '../utils/postToAPI';
import USERS_QUERY from '../queries/users.query';
import ADD_TEAM_MUTATION from '../queries/addTeam.mutation';
import UserSelector from '../components/UserSelector';

class NewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], selectedUsers: [] };
    this.name = React.createRef();
    this.description = React.createRef();

    this.onSelectUser = this.onSelectUser.bind(this);
    this.createTeam = this.createTeam.bind(this);
  }

  componentWillMount() {
    postToAPI(USERS_QUERY).then(res => {
      if (res && res.data && res.data.users) {
        this.setState({ users: res.data.users });
      }
    });
  }

  onSelectUser(userId) {
    this.setState(prevState => {
      const userIndex = prevState.selectedUsers.findIndex(su => su === userId);
      if (userIndex === -1) {
        prevState.selectedUsers.push(userId);
      } else {
        prevState.selectedUsers.splice(userIndex, 1);
      }
      return {
        selectedUsers: prevState.selectedUsers
      };
    });
  }

  createTeam() {
    const name = this.name.current.input.current.value;
    const { selectedUsers } = this.state;
    if (name && selectedUsers && selectedUsers.length) {
      const description = this.description.current.input.current.value;
      postToAPI(ADD_TEAM_MUTATION, {
        name,
        users: selectedUsers,
        description
      }).then(res => {
        if (res && res.data && res.data.addTeam) {
          this.props.history.push('/teams');
        }
      });
    }
  }

  render() {
    return (
      <div className="newTeamForm">
        <h1>Nuevo equipo</h1>
        <TextInput ref={this.name} label="Nombre" />
        <TextInput ref={this.description} label="Descripción" textArea />
        <UserSelector
          users={this.state.users}
          onSelectUser={this.onSelectUser}
          selectedUsers={this.state.selectedUsers}
        />
        <CustomButton text="Crear equipo" onClick={this.createTeam} />
      </div>
    );
  }
}

export default NewTeam;
