import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  # graphql version type alias
  type Movie {
    id: String!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    # "A simple type for getting started!"
    # resolver에서 정의된 함수의 반환 타입을 정해주는 것 like a type script~
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, year: Int, title: String, genre: String): Movie
  }
`;
