export default `mutation addUser($nick: String!, $email: String!, $password: String!) {
    addUser(nick: $nick,  email: $email, password: $password) {
      _id
      token
    }
  }`;
