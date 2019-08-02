export default `
  type User {
    _id: String!
    nick: String!
    email: String!
    token: String!
  }

  type Query {
    user(id: String!): User
    users: [User]
    login(nick: String!, password: String!): User
  }

  type Mutation {
    addUser(nick: String!, email: String!, password: String!): User
    editUser(id: String, name: String, email: String): User
    deleteUser(id: String, name: String, email: String): User
  }
`;
