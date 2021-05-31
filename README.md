# instagram clone version 3 🚀🚀🚀

instagram clone project(BACKEND)

# we don't need to graphql-yoga anymore , apollo가 이제 지원을 잘 해줌

# eslint and prettier setting

- https://velog.io/@das01063/VSCode%EC%97%90%EC%84%9C-ESLint%EC%99%80-Prettier-TypeScript-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

# ESLint 호환

npm i -D eslint-config-prettier eslint-plugin-prettier

- eslint-config-prettier는 Prettier와 충돌되는 ESLint 규칙들을 무시하는 설정이고, eslint-plugin-prettier는 Prettier를 사용해 포맷팅을 하도록 ESLint 규칙을 추가하는 플러그인입니다. (출처: Prettier - Integrating with Linters)

# prettierrc.json 내용

```
{
    "printWidth": 80,			// 한 줄의 라인 수
    "tabWidth": 2,			// tab의 너비
    "useTabs": false,			// tab 사용 여부
    "semi": true,				// ; 사용 여부
    "singleQuote": true,			// 'string' 사용 여부
    "quoteProps": "consistent",		// 객체 property의 따옴표 여부
    "trailingComma": "es5",		// 끝에 , 사용 여부
    "bracketSpacing": true,		// Object literal에 띄어쓰기 사용 여부 (ex: { foo: bar })
    "arrowParens": "always",		// 함수에서 인자에 괄호 사용 여부 (ex: (x) => y)
    "endOfLine": "lf"			// 라인 엔딩 지정
  }
```

# eslintrc.json 내용

```
{
  ...
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  ...
}
```

# apollo-server graphql install

- https://github.com/apollographql 참고

# nodemon 설치 후 nodemon을 이용하여 서버 실행

# issue!! - import 문으로 바꾸어서 라이브러리를 사용하고 싶을때

1. way one

```
(node:32191) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/Users/nohsangwoo/Desktop/reactClass/instaclone/server.js:1
```

라는 에러가 나타남 (기본적으로 es 모듈이 아니기때문)

- 에러의 내용대로 package.json에 "type": "module" 이란 옵션 추가 그럼 이상없음

2. way two
   위 방식은 node버젼이 낮은경우 사용할수 없을지도 모름 따라서 babel을 이용하여 trade off를 없애버릴꺼임

- "type": "module" 설정을 다시 없애줌
- babel 사용 (javascript 컴파일러)
  지원안하는 신버젼 자바스크립트 문법을 구버젼에서도 구동할수있게 컴파일 해주는 기능
  https://babeljs.io/setup#installation 참고

- npm install --save-dev @babel/core
- npm install @babel/preset-env --save-dev
- root경로에 babel.config.json 파일 생성 후 공식문서에 있는 세팅 옵션 복사 붙여넣기

```
{
  "presets": ["@babel/preset-env"]
}
```

- package.json 에

```
    "dev": "nodemon --exec babel-node server"

```

- npm install @babel/node --save-dev
  (콘솔에서 js파일을 실행시켜주는 기능)
- @babel/preset-env
  (어떤 버젼에서든 최신 자바스크립트 문법을 사용할 수 있게 해줌)
  이제 node가 높은 버젼이든 낮은 버젼이든 해석해서 실행 해줌

# prisma 설치

- https://www.prisma.io/

1. npm install prisma -D
2. npx prisma init
3. 이렇게 하면 root 경로에 prisma/schema.prisma 파일이랑 .env파일 만들어짐
   (기본적으로 postgresql세팅 방법의 예시로 만들어져있음)

# schema.prisma 파일에 데이터베이스 모델 구현

# migrate로 진행

<!-- npx prisma migrate dev --name add-profile --> 2021.04.11일 기준 여기서 --name add-profile은 제외

- npx prisma migrate dev
  (이때 .env의 postgresql에 필요한정보를 잘 입력한다./사용자이름 비번 포트번호 등등..)
- 위 단계를 잘 따른다면 shema.prisma에서 지정한 model이 데이터베이스와 동기화됨(연동이 완료됨)

# typeDef에 schema의 model내용을 수동으로 sync해줘야함

(이때 sync정의시 주의사항)

- typeDef
  typeDef에서 table을 정의할때 기본적으로 optinal속성이기때문에 require인 경우는 !를 붙여줘야함
- schema.prisma
  schema에서 model정의할때 기본적으로 require속성이기에
  optional인 경우는 ?를 붙여줘야함
- 위 두개의 차이를 인식하고 모델과 타입을 정의한다

# prisma studio

- npx prisma studio 로 실행 (package.json에 추가)

- https://www.prisma.io/docs/concepts/components/prisma-studio
  postico 같은건데 prisma에 최적화된 데이터베이스 시각화 프로그램

# 파일을 분할하기위해 graphql-tools 라이브러리 사용

- npm install graphql-tools@latest
  (분할된 파일을 한곳에 모아서 로드하기위한 작업)
- https://www.graphql-tools.com/docs/schema-merging
  (분할된 schema들을 모아주는 기능)

# apply to dotenv

- npm install dovenv

# BFORE start clone coding

- prisma파일과 , Movie와 관련된 typeDefs, resolvers파일을 삭제 및 database를 삭제 후 처음부터 다시 시작하게 세팅해둠
- 또한 다시 instaclone데이터베이스를 다시 생성해줌

# USER MODULE

## User:

- [x] Create Account
- [x] See Profile
- [x] Login
- [x] Edit Profile
- [x] Follow User
- [x] Unfollow User
- [x] See Followers w/ Pagination
- [x] See Following w/ Pagination
- [x] Computed Fields
- [x] Search Users

## Photos

- [ ] See Photo
- [ ] Upload Photo
- [ ] Edit Photo
- [ ] Like / Unlike Photo
- [ ] See Photo Likes
- [ ] See Feed
- [ ] Search Photos
- [ ] See Hashtags
- [ ] Comments
- [ ] Comment on Photo
- [ ] Edit Comment
- [ ] Delete Comment

# 4.0 createAccount part one

- npx prisma init

# 4.2 bcrypt createAccount part two

- hashing password
- npm install bcrypt

# 4.3 createAccount part three

- createAccount 기능 구현

# 4.4 login

- npm install jsonwebtoken

1. find username
2. compare password
3. return jsonwebtoken

# 4.9 http header에서 mutaion이나 query등에서 인자로 받아오는 방법

# 4.10 context에서 request와 response를 사용하는 방법

# 4.13 currying 개념 익히기

# 4.14 apollo-server가 제공하는 api등을 사용하기위해 schema형식 변경

# graphql client altair

https://altair.sirmuel.design/features

# 4.16

altair사용하여 fileuload에서 createStream 사용시 생기는 버그 해결법

```
 "resolutions": {
    "fs-capacitor": "^6.2.0",
    "graphql-upload": "^11.0.0"
  }
```

- script 에 추가
  npx npm-force-resolutions

# 4.17 upload part four

- process.cwd()

current working directory
현재 프로젝트의 root경로

# graphql server를 apollo server에서 express로 변경하여 돌려버리기

- npm install apollo-server-express
- npm install express
- npm install morgan

# 4.20 self-referencing relationship

# 4.20 unfollow user

# include 를 이용하여 대상의 컬럼이 다른 사용자와 관계가 있다면 해당 정보를 가져오도록 해줌

# 4.23 Followers Pagination part One - offset Pagenation

- https://www.prisma.io/docs/concepts/components/prisma-client/pagination#offset-pagination
- where의 오퍼레이터로 some,every,none을 사용할수있음

```
const followers = await client.user.findMany({
  where:{
    some:{   <--- 사용법
      username:username
    }
  }
})
```

- some : 제공하는 검색어의 일부라도 포함된다면 결과값에 포함하여 반환
- every : 조건에 완벽하게 부합하는 결과값만 반환
- none : 조건에 부합하는 값을 제외한 결과값을 반환(like a omit)

# 4.24 followers pagination part two

- select로 검색시 불러오는 데이터필드를 선택가능

```
  const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
```

- username으로 검색한 결과중 id의 내용만 필터링 하여 가져옴(컬럼의 pick type과 같음)

# 4.25 following pagination part one - cursur pagination

- https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination

# 4.26 Computed Fields part One

- 데이터베이스엔 존재하지 않지만 무엇인가 계산해서 제공해주는 값

- root arguement 사용법
  상위 parent가 존재한다면 해당parent의 값

# 4.27 isMe computed field

# 4.28 isFollowing computed field

- seeProfile로 검색한 유저가 (로그인된)내가 following한 대상인지 구분해주는 필드

# 4.29 searching users

- startsWith
  키워드가 시작되는 부분과 같다면 검색됨
  ex)
  term: noh // -- 검색어
  nohsangwoo // 검색됨
  sangwoonoh // 검색안됨

```
client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
```

# Photos

- [x] Upload Photo (Parse #)
- [x] See Photo
- [x] See Hashtag
- [x] Search Photos
- [x] Edit Photo
- [x] Like / Unlike Photo
- [x] See Photo Likes
- [x] See Feed
- [x] See Photo Comments
- [x] Is Mine (Delete Photo)

# Comments

- [x] Comment on Photo
- [x] Delete Comment (Is Mine)
- [x] Edit Comment

## Refactor

- [x] Mutation Responses

## Extras

- [x] S3 Image Upload

# 6.0 Photos Model

# 6.2 Upload Photo part One

- setting basic form

# 6.3 Upload Photo part Two

- https://www.regexpal.com/
  정규 표현식 도움
  (match)함수를 사용하여 정규표현식을 사용하여 배열로 특정 단어를 추출하여 배열로 반환함

# 6.5 seePhoto

# 6.6 seeHashtag

- Photo - user
  이 photo와 연결된 하나의 user를 검색

- Photo - hashtags
  이 photo id를 가지고있는 모든 hashtag를 검색

- Hashtag - photos
  해시 태그에서 hashtag의 id를 가지고있는 photo들을 검색
- hashtag - totalPhotos.count
  해시 태그 에서 해당 태그를 가지고있는 모든 photo 의 수를 검색
- seeHashtag
  hashtag 이름으로 하나의 hashtag를 검색

# update

npm i --save-dev prisma │
npm i @prisma/client

# 6.10 Like Unlike Photos part two

- 즉 로그인한 유저(사용자가) 어떤 사진에 like를 눌렀거나 취소했을때정보를 like테이블에 담는다.
- 이때 like가 만들어지는 조건은 user와 photo에 connect 하는 방식으로 연결

# 6.11 seePhotoLikes

- 사진에 like를 누른 유저의 정보들을 보여줌
- 그러기 위해 select조건을 사용하는데 , 선택한 특정 key의 데이터 정보만 가져오는 것 이고(picktype같은느낌)
- include는 기본적으로 가져와지는 데이터에 "추가로" 특정 key값의 데이터도 가져오는것임(extends같은 느낌)

# 6.12 seeFeed

- 내 feed와 나를 follow하는 유저의 feed를 전부 가져옴
- 이때 feed라는건 사진 정보를 가져오는 것
- 이때 정렬은 만들어진 날짜가 가장 최근의 것이 가장 먼저 불려오도록 정렬한다

# some, every, none

- some 하나 또는 모든 결과를 반환할때!(거의 이것만 쓰임)
- https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#some 참조

# 6.13 Comment on Photos

- 사진에 달린 댓글(약간 like와 비슷함)

# 6.14 See Photo Comments

- 특정 사진에 연결된 모든 comment를 찾아서 반환

# 6.15 isMine

- photo가 내껀지 아닌지만 판별하는 기능
- photo의 userId를 전달받아서 사용함(첫번째 arg는 parent의 userId임)
  예컨데 Comment에서 무엇인가 query, mutation을 사용시 해당 테이블의 field중 userId가 존재한다면 query, mutation을 사용할때 첫번째 args로 전달받을수 있다
  ```
  export default {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },
  };
  <!-- 이런 형식임 -->
  ```

# 6.16 Delete Comment and Photos

- 특정 photo와 comment를 찾아서 삭제하는 기능

# 6.17 editComment

- shared 폴더에 담아둔 typeDefs는 공유됨

# 6.18 protectedResolver Refactor

- info args 사용법
  info : 현재 작업중인 쿼리또는 뮤테이션의 정보를 담고있음

# change return type

- MutationResponse type

# 6.19 S3 Photo Upload

aws s3 에 사진 업로드하기

- npm i aws-sdk
  https://www.npmjs.com/package/aws-sdk

- s3 사용법 익히기

# 6.21 S3 Photo Upload part Three

uploadPhoto에도 실제로 S3서버에 업로드하는방법 추가 및 경로 설정

# s3에서 사진을 지우고 싶을때

```
export const deleteInS3 = async (fileUrl) => {
const Key = fileUrl.replace(
'https://버킷이름.s3.amazonaws.com/',
''
);
await S3.deleteObject({
Bucket,
Key,
}).promise();
};
```

## DMs

- [x] See Room
- [x] Send Message (Create Room)
- [x] See Rooms
- [x] Computed Fields
- [x] See (Read) Message
- [ ] Realtime Messages

# 7.2 seeRooms

- room 테이블에서 로그인한 유저의 모든 방을 찾는다

# 7.3 sendMessage

- 메시지를 보낼 대상의 사용자만 존재하면(이미 방이 만들어지지 않은경우) room 생성

- 메시지를 보낼껀데 이미 room이 존재하는경우 roomId를 전달받아 message를 room과 user에 연결한다

- room이 없고 대상 userId만 있으면 새롭게 방을 만든다음 메시지를 보낼 대상 user와 로그인한 유저의 user를 connect해준다.

- 마지막으로 메시지를 생성한다음 room과 로그인한 User를 연결해준다.

# 7.4 seeRoom

- 나와 대화중인 특정 방을 찾음, 이때 users에 로그인한 유저의 id가 포함돼야하기 때문에 findFirst를 사용
  (findUnique는 한개의유니크한 컬럼만으로 검색가능)

# 7.5 readMessage

- 안읽은 메시지를 읽는 순간 read :true로 변환시켜줌

- 내가 대화방에 들어가있고 내가 그메시지를 보낸 사용자가 아닐때
  그리고 내가 그 메시지가 보내진걸 알고 있을때
  그 메시지를 읽음 표시 할 수 있다.

# 다른 테이블의 내용을 불러올때 computed field로 처리하는 이유는

```
message{
  id
  user{
    id
    username
    message{
      user{
        id
        message{
          user{
            username..
            message....
          }
        }
      }
    }
  }
}
```

이런식으로 무한의 깊이로 빠지지 않게 만들기 위해 다른 테이블 접근시는 computed field(자동계산)로 처리해준다

# 7.7 Subscriptions Setup part One

- subscription은 서버에있는 것이 무엇이든 항상 listen할 수 있게 해줌
- 실시간이고 웹소켓 기반임
- subscriptions할때 필요 조건중 하나는 pubsub class가 있어야 함
- but pubsub은 prod용으론 적합하지 않고 Redis pubsub서버를 사용하는게 prod 용으로 좋음
- 돈내는거 말고는 똑같이 작동함 (사용법도 비슷함)
- https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries 참고

- 웹소켓에 대한 정보를 우리 서버에 설치

# 7.8 Subscriptions Setup part Two

subscriptions 사용위한 환경 설정

- subscription의 pubsub.publish 의 사용법은
  트리거와 typedef에서 지정한 subscription 이름 이다.

```
    pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });

```

# 7.9 Filtering Subscriptions part One

- withFilter를 이용하여 Subscriptions의 조건을 만들어줌

# 7.10 Filtering Subscriptions part Two

- roomId를 가지고 subscriptions중 방이 없는경우 핸들링
- 상위 컴포넌트에서 전달받지 않은 함수를 고차컴포넌트 형식으로 사용하고 싶을때 패턴

# 7.11 Authenticating Subscriptions

- onConnect 사용법
  user가 연결됏을때 뭔가를 해줄수 있는 기능
  여기서 http header를 전달받아 핸들링할수 있다.
- https://www.apollographql.com/docs/apollo-server/data/subscriptions/#onconnect-and-ondisconnect 참고

-

# isLiked

- 내가 해당 feed에 like를 했는지 여부
- like테이블에서 연결된 photoId와 userId를 찾아서 해당조건에 만족하는 like가 있으면 true를 반환하고 없으면 false를 반환한다.

# Comment number for photo's computed field

# fix Comments function

# change seeFeed for infinite scrolling

- # 15.10

- # 16.6 fix searchPhotos resovers

  searchPhotos에서 검색시 startsWitth가 아닌 contains로 검색
  startsWith : 검색어의 시작부분이 꼭 같아야 검색됨
  contains : 검색어의 어느 부분이든 겹치는 부분이 존재하면 검색됨

- seePhotoComments 에 include:{ user:true } 설정
  그래야 comments 에서 user정보 불러올수 있음
