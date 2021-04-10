import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './schema';

// graphql-server에 적혀있는 세팅 방법

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => {
  console.log(`🚀 Server is running on http://www.localhost:4000`);
});
