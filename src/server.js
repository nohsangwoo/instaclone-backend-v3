require('dotenv').config();
import http from 'http';
import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';
// import cors from 'cors';

// // cors에서 특정 web만 허용하기위해서 사용
// const corsOptions = {
//   origin: 'https://insta-front-end-v3-noh.netlify.app',
//   credentials: true,
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  cors: {
    origin: 'https://insta-front-end-v3-noh.netlify.app', // or true 전부허용시
    credentials: true,
  },

  resolvers,
  typeDefs,
  playground: true,
  introspection: true,
  // http 상태와 ws상태를 둘다 사용하려고 이런 작업을 해줌
  // context는 모든 resolver 사용시 세번째 agrs로 받아올수 있는 값을 말한다.
  // 지금은 이곳에서 https headers에서 전달받는 token값을 이용하여 로그인한 유저의 상태를 반환하지만
  // 상황에 따라 무궁무진한 사용방법이 존재한다
  context: async (ctx) => {
    // ctx => context를 줄여서 표현함
    // request가 있다면 즉, https headers를 사용하여 직접 전달 받은것이라면 token을 바로 가져옴
    if (ctx.req) {
      console.log('token for on req', ctx.req.headers.token);

      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      // request가 없다면, 즉 ws를 통해 전달받은 context가 있다면 전달받은 context에서 우리가 필요한 값을 추출한다
      // 여기서는 context안의 connection 안의 context 값을 추출하고
      // 해당 context는 아래 onConnect에서 token을 가지고 처리한loggedInUser의 정보를 가져온다
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    // onConnect의 첫번째 파라미터는 http의 Headers이다 headers로 token을 전달받고있으니 여기서도 보이는 것
    // 로그인된 사람만 subscriptions기능을 이용할 수 있다라고 설계한 경우만 이렇게 구성 그게 아니라면 이렇게 설계 하면 안됨
    onConnect: async ({ token }) => {
      console.log('token for on conect', token);
      // token을 headers로 전달 받지 못했으면 listening권한이 없음 에러 핸들링
      if (!token) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);

      // 여기서 return 하는 값은 context로 전달됨
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
app.use(logger('tiny'));
apollo.applyMiddleware({ app });
app.use('/static', express.static('uploads'));

// cors설정
// app.use(cors(corsOptions));

// http server 생성
const httpServer = http.createServer(app);

// 웹소켓에 대한 정보를 우리 서버에 설치
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});
