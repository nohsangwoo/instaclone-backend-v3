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
- [ ] Like / Unlike Photo
- [ ] See Photo Likes
- [ ] See Feed
- [ ] Comments
- [ ] Comment on Photo
- [ ] Edit Comment
- [ ] Delete Comment

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
