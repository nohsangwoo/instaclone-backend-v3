import { PrismaClient } from '.prisma/client';
import { ApolloServer, gql } from 'apollo-server';

const client = new PrismaClient();
// graphql-server에 적혀있는 세팅 방법
// The GraphQL schema
const typeDefs = gql`
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

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movies: () => client.movie.findMany(), //정의된 movie 모두 검색
    movie: (_, { id }) => client.movie.findUnique({ where: id }),
  },
  Mutation: {
    createMovie: (root, { title, year, genre }, context, info) =>
      client.movie.create({ data: { title, year, genre } }),
    deleteMovie: (root, { id }, context, info) =>
      client.movie.delete({ where: { id } }),
    updateMovie: (root, { id, year, title, genre }, context, info) =>
      client.movie.update({
        where: { id },
        data: {
          year,
          title,
          genre,
        },
      }),
  },
};

// create server
// 여기서  사용하는 typeDef와 resolver들 합쳐줌
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => {
  console.log(`🚀 Server is running on http://www.localhost:4000`);
});
