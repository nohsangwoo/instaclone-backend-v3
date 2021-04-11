import { ApolloServer } from 'apollo-server';
import schema from './schema';

// graphql-server에 적혀있는 세팅 방법

const server = new ApolloServer({
  schema
});

server.listen().then(() => {
  console.log(`🚀 Server is running on http://www.localhost:4000`);
});
