import { ApolloServer, gql } from 'apollo-server';

// graphql-server에 적혀있는 세팅 방법
// The GraphQL schema
const typeDefs = gql`
  # graphql version type alias
  type Movie {
    id: String
    title: String
    year: Int
  }
  type Query {
    # "A simple type for getting started!"
    # resolver에서 정의된 함수의 반환 타입을 정해주는 것 like a type script~
    movies: [Movie]
    movie: Movie
  }
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({ title: 'equalibriam', year: 2007 }),
  },
  Mutation: {
    createMovie: (root, { title }, context, info) => {
      console.log(title);
      return true;
    },
    deleteMovie: (root, { title }, context, info) => {
      console.log(title);
      return true;
    },
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
