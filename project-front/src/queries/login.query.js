export default `query login($nick: String!, $password: String!) {
    login(nick: $nick, password: $password) {
      _id
      token
      email
    }
  }`;
