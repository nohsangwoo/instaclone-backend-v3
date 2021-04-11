// env불러오는 방법, 이제 모든 경로에서 env를 사용가능
require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';

// graphql-server에 적혀있는 세팅 방법

const server = new ApolloServer({
  schema,
});

// env안의 변수를 불러오는 방법
const PORT = process.env.PORT;
server.listen(PORT).then(() => {
  console.log(`🚀 Server is running on http://www.localhost:${PORT}🚀🚀🚀🚀`);
});
