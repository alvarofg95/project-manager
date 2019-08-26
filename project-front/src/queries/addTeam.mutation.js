export default `mutation addTeam($name: String!, $description: String, $users: [String]) {
    addTeam(name: $name,  description: $description, users: $users) {
      _id
      numUsers
      users {
        _id
      }
    }
  }`;
