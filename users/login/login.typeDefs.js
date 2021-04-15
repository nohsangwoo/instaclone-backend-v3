import { gql } from 'apollo-server-core';

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  # mutation
  type Mutation {
    login(username: String!, password: String!): LoginResult!
  }
`;
