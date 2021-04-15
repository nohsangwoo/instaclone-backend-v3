// env불러오는 방법, 이제 모든 경로에서 env를 사용가능
require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';

// graphql-server에 적혀있는 세팅 방법

const server = new ApolloServer({
  schema,
  // context로 넘겨주는 인자를 설정
  // mutation이나 query시 받는 인자의 세번째 순서에 context가 들어감
  context: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE4NDYzNDMyfQ.QZErisbG7PivIGkJMxr16Omv2HWrVY_qAbcxihKMZRU',
  },
});

// env안의 변수를 불러오는 방법
const PORT = process.env.PORT;
server.listen(PORT).then(() => {
  console.log(`🚀 Server is running on http://www.localhost:${PORT}🚀🚀🚀🚀`);
});
