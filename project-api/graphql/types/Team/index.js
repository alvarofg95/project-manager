export default `
  type UserTeam {
    _id: String
    nick: String
    email: String
  }

  type Team {
    _id: String!
    name: String!
    description: String
    numUsers: Int
    users: [UserTeam]
  }

  type Result {
    ok: String
    error: String
  }

  type Query {
    team(id: String!): Team
    teams: [Team]
  }

  type Mutation {
    addTeam(name: String!, users: [String], description: String): Team
    editTeamName(id: String!, name: String!): Team
    editTeamUsers(id: String!, users: [String!]): Team
    deleteTeam(id: String!): Result
  }
`;
