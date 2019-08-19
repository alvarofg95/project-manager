import React, { Component } from 'react';
import postToAPI from '../utils/postToAPI';
import USERS_QUERY from '../queries/users.query';
import UsersTable from '../components/UsersTable';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentWillMount() {
    postToAPI(USERS_QUERY).then(res => {
      if (res && res.data && res.data.users) {
        this.setState({ users: res.data.users });
      }
    });
  }

  render() {
    const { users } = this.state;

    return (
      <div className="container usersTable">
        <h1>Listado de usuarios</h1>
        <UsersTable users={users} />
      </div>
    )
  }
}

export default Users;
