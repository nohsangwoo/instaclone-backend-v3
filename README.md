# instagram clone version 3 ๐๐๐

instagram clone project(BACKEND)

# we don't need to graphql-yoga anymore , apollo๊ฐ ์ด์  ์ง์์ ์ ํด์ค

# eslint and prettier setting

- https://velog.io/@das01063/VSCode%EC%97%90%EC%84%9C-ESLint%EC%99%80-Prettier-TypeScript-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

# ESLint ํธํ

npm i -D eslint-config-prettier eslint-plugin-prettier

- eslint-config-prettier๋ Prettier์ ์ถฉ๋๋๋ ESLint ๊ท์น๋ค์ ๋ฌด์ํ๋ ์ค์ ์ด๊ณ , eslint-plugin-prettier๋ Prettier๋ฅผ ์ฌ์ฉํด ํฌ๋งทํ์ ํ๋๋ก ESLint ๊ท์น์ ์ถ๊ฐํ๋ ํ๋ฌ๊ทธ์ธ์๋๋ค. (์ถ์ฒ: Prettier - Integrating with Linters)

# prettierrc.json ๋ด์ฉ

```
{
    "printWidth": 80,			// ํ ์ค์ ๋ผ์ธ ์
    "tabWidth": 2,			// tab์ ๋๋น
    "useTabs": false,			// tab ์ฌ์ฉ ์ฌ๋ถ
    "semi": true,				// ; ์ฌ์ฉ ์ฌ๋ถ
    "singleQuote": true,			// 'string' ์ฌ์ฉ ์ฌ๋ถ
    "quoteProps": "consistent",		// ๊ฐ์ฒด property์ ๋ฐ์ดํ ์ฌ๋ถ
    "trailingComma": "es5",		// ๋์ , ์ฌ์ฉ ์ฌ๋ถ
    "bracketSpacing": true,		// Object literal์ ๋์ด์ฐ๊ธฐ ์ฌ์ฉ ์ฌ๋ถ (ex: { foo: bar })
    "arrowParens": "always",		// ํจ์์์ ์ธ์์ ๊ดํธ ์ฌ์ฉ ์ฌ๋ถ (ex: (x) => y)
    "endOfLine": "lf"			// ๋ผ์ธ ์๋ฉ ์ง์ 
  }
```

# eslintrc.json ๋ด์ฉ

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

- https://github.com/apollographql ์ฐธ๊ณ 

# nodemon ์ค์น ํ nodemon์ ์ด์ฉํ์ฌ ์๋ฒ ์คํ

# issue!! - import ๋ฌธ์ผ๋ก ๋ฐ๊พธ์ด์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ฌ์ฉํ๊ณ  ์ถ์๋

1. way one

```
(node:32191) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/Users/nohsangwoo/Desktop/reactClass/instaclone/server.js:1
```

๋ผ๋ ์๋ฌ๊ฐ ๋ํ๋จ (๊ธฐ๋ณธ์ ์ผ๋ก es ๋ชจ๋์ด ์๋๊ธฐ๋๋ฌธ)

- ์๋ฌ์ ๋ด์ฉ๋๋ก package.json์ "type": "module" ์ด๋ ์ต์ ์ถ๊ฐ ๊ทธ๋ผ ์ด์์์

2. way two
   ์ ๋ฐฉ์์ node๋ฒ์ ผ์ด ๋ฎ์๊ฒฝ์ฐ ์ฌ์ฉํ ์ ์์์ง๋ ๋ชจ๋ฆ ๋ฐ๋ผ์ babel์ ์ด์ฉํ์ฌ trade off๋ฅผ ์์ ๋ฒ๋ฆด๊บผ์

- "type": "module" ์ค์ ์ ๋ค์ ์์ ์ค
- babel ์ฌ์ฉ (javascript ์ปดํ์ผ๋ฌ)
  ์ง์์ํ๋ ์ ๋ฒ์ ผ ์๋ฐ์คํฌ๋ฆฝํธ ๋ฌธ๋ฒ์ ๊ตฌ๋ฒ์ ผ์์๋ ๊ตฌ๋ํ ์์๊ฒ ์ปดํ์ผ ํด์ฃผ๋ ๊ธฐ๋ฅ
  https://babeljs.io/setup#installation ์ฐธ๊ณ 

- npm install --save-dev @babel/core
- npm install @babel/preset-env --save-dev
- root๊ฒฝ๋ก์ babel.config.json ํ์ผ ์์ฑ ํ ๊ณต์๋ฌธ์์ ์๋ ์ธํ ์ต์ ๋ณต์ฌ ๋ถ์ฌ๋ฃ๊ธฐ

```
{
  "presets": ["@babel/preset-env"]
}
```

- package.json ์

```
    "dev": "nodemon --exec babel-node server"

```

- npm install @babel/node --save-dev
  (์ฝ์์์ jsํ์ผ์ ์คํ์์ผ์ฃผ๋ ๊ธฐ๋ฅ)
- @babel/preset-env
  (์ด๋ค ๋ฒ์ ผ์์๋  ์ต์  ์๋ฐ์คํฌ๋ฆฝํธ ๋ฌธ๋ฒ์ ์ฌ์ฉํ  ์ ์๊ฒ ํด์ค)
  ์ด์  node๊ฐ ๋์ ๋ฒ์ ผ์ด๋  ๋ฎ์ ๋ฒ์ ผ์ด๋  ํด์ํด์ ์คํ ํด์ค

# prisma ์ค์น

- https://www.prisma.io/

1. npm install prisma -D
2. npx prisma init
3. ์ด๋ ๊ฒ ํ๋ฉด root ๊ฒฝ๋ก์ prisma/schema.prisma ํ์ผ์ด๋ .envํ์ผ ๋ง๋ค์ด์ง
   (๊ธฐ๋ณธ์ ์ผ๋ก postgresql์ธํ ๋ฐฉ๋ฒ์ ์์๋ก ๋ง๋ค์ด์ ธ์์)

# schema.prisma ํ์ผ์ ๋ฐ์ดํฐ๋ฒ ์ด์ค ๋ชจ๋ธ ๊ตฌํ

# migrate๋ก ์งํ

<!-- npx prisma migrate dev --name add-profile --> 2021.04.11์ผ ๊ธฐ์ค ์ฌ๊ธฐ์ --name add-profile์ ์ ์ธ

- npx prisma migrate dev
  (์ด๋ .env์ postgresql์ ํ์ํ์ ๋ณด๋ฅผ ์ ์๋ ฅํ๋ค./์ฌ์ฉ์์ด๋ฆ ๋น๋ฒ ํฌํธ๋ฒํธ ๋ฑ๋ฑ..)
- ์ ๋จ๊ณ๋ฅผ ์ ๋ฐ๋ฅธ๋ค๋ฉด shema.prisma์์ ์ง์ ํ model์ด ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ๋๊ธฐํ๋จ(์ฐ๋์ด ์๋ฃ๋จ)

# typeDef์ schema์ model๋ด์ฉ์ ์๋์ผ๋ก syncํด์ค์ผํจ

(์ด๋ sync์ ์์ ์ฃผ์์ฌํญ)

- typeDef
  typeDef์์ table์ ์ ์ํ ๋ ๊ธฐ๋ณธ์ ์ผ๋ก optinal์์ฑ์ด๊ธฐ๋๋ฌธ์ require์ธ ๊ฒฝ์ฐ๋ !๋ฅผ ๋ถ์ฌ์ค์ผํจ
- schema.prisma
  schema์์ model์ ์ํ ๋ ๊ธฐ๋ณธ์ ์ผ๋ก require์์ฑ์ด๊ธฐ์
  optional์ธ ๊ฒฝ์ฐ๋ ?๋ฅผ ๋ถ์ฌ์ค์ผํจ
- ์ ๋๊ฐ์ ์ฐจ์ด๋ฅผ ์ธ์ํ๊ณ  ๋ชจ๋ธ๊ณผ ํ์์ ์ ์ํ๋ค

# prisma studio

- npx prisma studio ๋ก ์คํ (package.json์ ์ถ๊ฐ)

- https://www.prisma.io/docs/concepts/components/prisma-studio
  postico ๊ฐ์๊ฑด๋ฐ prisma์ ์ต์ ํ๋ ๋ฐ์ดํฐ๋ฒ ์ด์ค ์๊ฐํ ํ๋ก๊ทธ๋จ

# ํ์ผ์ ๋ถํ ํ๊ธฐ์ํด graphql-tools ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ฌ์ฉ

- npm install graphql-tools@latest
  (๋ถํ ๋ ํ์ผ์ ํ๊ณณ์ ๋ชจ์์ ๋ก๋ํ๊ธฐ์ํ ์์)
- https://www.graphql-tools.com/docs/schema-merging
  (๋ถํ ๋ schema๋ค์ ๋ชจ์์ฃผ๋ ๊ธฐ๋ฅ)

# apply to dotenv

- npm install dovenv

# BFORE start clone coding

- prismaํ์ผ๊ณผ , Movie์ ๊ด๋ จ๋ typeDefs, resolversํ์ผ์ ์ญ์  ๋ฐ database๋ฅผ ์ญ์  ํ ์ฒ์๋ถํฐ ๋ค์ ์์ํ๊ฒ ์ธํํด๋ 
- ๋ํ ๋ค์ instaclone๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ๋ค์ ์์ฑํด์ค

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

- createAccount ๊ธฐ๋ฅ ๊ตฌํ

# 4.4 login

- npm install jsonwebtoken

1. find username
2. compare password
3. return jsonwebtoken

# 4.9 http header์์ mutaion์ด๋ query๋ฑ์์ ์ธ์๋ก ๋ฐ์์ค๋ ๋ฐฉ๋ฒ

# 4.10 context์์ request์ response๋ฅผ ์ฌ์ฉํ๋ ๋ฐฉ๋ฒ

# 4.13 currying ๊ฐ๋ ์ตํ๊ธฐ

# 4.14 apollo-server๊ฐ ์ ๊ณตํ๋ api๋ฑ์ ์ฌ์ฉํ๊ธฐ์ํด schemaํ์ ๋ณ๊ฒฝ

# graphql client altair

https://altair.sirmuel.design/features

# 4.16

altair์ฌ์ฉํ์ฌ fileuload์์ createStream ์ฌ์ฉ์ ์๊ธฐ๋ ๋ฒ๊ทธ ํด๊ฒฐ๋ฒ

```
 "resolutions": {
    "fs-capacitor": "^6.2.0",
    "graphql-upload": "^11.0.0"
  }
```

- script ์ ์ถ๊ฐ
  npx npm-force-resolutions

# 4.17 upload part four

- process.cwd()

current working directory
ํ์ฌ ํ๋ก์ ํธ์ root๊ฒฝ๋ก

# graphql server๋ฅผ apollo server์์ express๋ก ๋ณ๊ฒฝํ์ฌ ๋๋ ค๋ฒ๋ฆฌ๊ธฐ

- npm install apollo-server-express
- npm install express
- npm install morgan

# 4.20 self-referencing relationship

# 4.20 unfollow user

# include ๋ฅผ ์ด์ฉํ์ฌ ๋์์ ์ปฌ๋ผ์ด ๋ค๋ฅธ ์ฌ์ฉ์์ ๊ด๊ณ๊ฐ ์๋ค๋ฉด ํด๋น ์ ๋ณด๋ฅผ ๊ฐ์ ธ์ค๋๋ก ํด์ค

# 4.23 Followers Pagination part One - offset Pagenation

- https://www.prisma.io/docs/concepts/components/prisma-client/pagination#offset-pagination
- where์ ์คํผ๋ ์ดํฐ๋ก some,every,none์ ์ฌ์ฉํ ์์์

```
const followers = await client.user.findMany({
  where:{
    some:{   <--- ์ฌ์ฉ๋ฒ
      username:username
    }
  }
})
```

- some : ์ ๊ณตํ๋ ๊ฒ์์ด์ ์ผ๋ถ๋ผ๋ ํฌํจ๋๋ค๋ฉด ๊ฒฐ๊ณผ๊ฐ์ ํฌํจํ์ฌ ๋ฐํ
- every : ์กฐ๊ฑด์ ์๋ฒฝํ๊ฒ ๋ถํฉํ๋ ๊ฒฐ๊ณผ๊ฐ๋ง ๋ฐํ
- none : ์กฐ๊ฑด์ ๋ถํฉํ๋ ๊ฐ์ ์ ์ธํ ๊ฒฐ๊ณผ๊ฐ์ ๋ฐํ(like a omit)

# 4.24 followers pagination part two

- select๋ก ๊ฒ์์ ๋ถ๋ฌ์ค๋ ๋ฐ์ดํฐํ๋๋ฅผ ์ ํ๊ฐ๋ฅ

```
  const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
```

- username์ผ๋ก ๊ฒ์ํ ๊ฒฐ๊ณผ์ค id์ ๋ด์ฉ๋ง ํํฐ๋ง ํ์ฌ ๊ฐ์ ธ์ด(์ปฌ๋ผ์ pick type๊ณผ ๊ฐ์)

# 4.25 following pagination part one - cursur pagination

- https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination

# 4.26 Computed Fields part One

- ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์กด์ฌํ์ง ์์ง๋ง ๋ฌด์์ธ๊ฐ ๊ณ์ฐํด์ ์ ๊ณตํด์ฃผ๋ ๊ฐ

- root arguement ์ฌ์ฉ๋ฒ
  ์์ parent๊ฐ ์กด์ฌํ๋ค๋ฉด ํด๋นparent์ ๊ฐ

# 4.27 isMe computed field

# 4.28 isFollowing computed field

- seeProfile๋ก ๊ฒ์ํ ์ ์ ๊ฐ (๋ก๊ทธ์ธ๋)๋ด๊ฐ followingํ ๋์์ธ์ง ๊ตฌ๋ถํด์ฃผ๋ ํ๋

# 4.29 searching users

- startsWith
  ํค์๋๊ฐ ์์๋๋ ๋ถ๋ถ๊ณผ ๊ฐ๋ค๋ฉด ๊ฒ์๋จ
  ex)
  term: noh // -- ๊ฒ์์ด
  nohsangwoo // ๊ฒ์๋จ
  sangwoonoh // ๊ฒ์์๋จ

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
  ์ ๊ท ํํ์ ๋์
  (match)ํจ์๋ฅผ ์ฌ์ฉํ์ฌ ์ ๊ทํํ์์ ์ฌ์ฉํ์ฌ ๋ฐฐ์ด๋ก ํน์  ๋จ์ด๋ฅผ ์ถ์ถํ์ฌ ๋ฐฐ์ด๋ก ๋ฐํํจ

# 6.5 seePhoto

# 6.6 seeHashtag

- Photo - user
  ์ด photo์ ์ฐ๊ฒฐ๋ ํ๋์ user๋ฅผ ๊ฒ์

- Photo - hashtags
  ์ด photo id๋ฅผ ๊ฐ์ง๊ณ ์๋ ๋ชจ๋  hashtag๋ฅผ ๊ฒ์

- Hashtag - photos
  ํด์ ํ๊ทธ์์ hashtag์ id๋ฅผ ๊ฐ์ง๊ณ ์๋ photo๋ค์ ๊ฒ์
- hashtag - totalPhotos.count
  ํด์ ํ๊ทธ ์์ ํด๋น ํ๊ทธ๋ฅผ ๊ฐ์ง๊ณ ์๋ ๋ชจ๋  photo ์ ์๋ฅผ ๊ฒ์
- seeHashtag
  hashtag ์ด๋ฆ์ผ๋ก ํ๋์ hashtag๋ฅผ ๊ฒ์

# update

npm i --save-dev prisma โ
npm i @prisma/client

# 6.10 Like Unlike Photos part two

- ์ฆ ๋ก๊ทธ์ธํ ์ ์ (์ฌ์ฉ์๊ฐ) ์ด๋ค ์ฌ์ง์ like๋ฅผ ๋๋ ๊ฑฐ๋ ์ทจ์ํ์๋์ ๋ณด๋ฅผ likeํ์ด๋ธ์ ๋ด๋๋ค.
- ์ด๋ like๊ฐ ๋ง๋ค์ด์ง๋ ์กฐ๊ฑด์ user์ photo์ connect ํ๋ ๋ฐฉ์์ผ๋ก ์ฐ๊ฒฐ

# 6.11 seePhotoLikes

- ์ฌ์ง์ like๋ฅผ ๋๋ฅธ ์ ์ ์ ์ ๋ณด๋ค์ ๋ณด์ฌ์ค
- ๊ทธ๋ฌ๊ธฐ ์ํด select์กฐ๊ฑด์ ์ฌ์ฉํ๋๋ฐ , ์ ํํ ํน์  key์ ๋ฐ์ดํฐ ์ ๋ณด๋ง ๊ฐ์ ธ์ค๋ ๊ฒ ์ด๊ณ (picktype๊ฐ์๋๋)
- include๋ ๊ธฐ๋ณธ์ ์ผ๋ก ๊ฐ์ ธ์์ง๋ ๋ฐ์ดํฐ์ "์ถ๊ฐ๋ก" ํน์  key๊ฐ์ ๋ฐ์ดํฐ๋ ๊ฐ์ ธ์ค๋๊ฒ์(extends๊ฐ์ ๋๋)

# 6.12 seeFeed

- ๋ด feed์ ๋๋ฅผ followํ๋ ์ ์ ์ feed๋ฅผ ์ ๋ถ ๊ฐ์ ธ์ด
- ์ด๋ feed๋ผ๋๊ฑด ์ฌ์ง ์ ๋ณด๋ฅผ ๊ฐ์ ธ์ค๋ ๊ฒ
- ์ด๋ ์ ๋ ฌ์ ๋ง๋ค์ด์ง ๋ ์ง๊ฐ ๊ฐ์ฅ ์ต๊ทผ์ ๊ฒ์ด ๊ฐ์ฅ ๋จผ์  ๋ถ๋ ค์ค๋๋ก ์ ๋ ฌํ๋ค

# some, every, none

- some ํ๋ ๋๋ ๋ชจ๋  ๊ฒฐ๊ณผ๋ฅผ ๋ฐํํ ๋!(๊ฑฐ์ ์ด๊ฒ๋ง ์ฐ์)
- https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#some ์ฐธ์กฐ

# 6.13 Comment on Photos

- ์ฌ์ง์ ๋ฌ๋ฆฐ ๋๊ธ(์ฝ๊ฐ like์ ๋น์ทํจ)

# 6.14 See Photo Comments

- ํน์  ์ฌ์ง์ ์ฐ๊ฒฐ๋ ๋ชจ๋  comment๋ฅผ ์ฐพ์์ ๋ฐํ

# 6.15 isMine

- photo๊ฐ ๋ด๊ป์ง ์๋์ง๋ง ํ๋ณํ๋ ๊ธฐ๋ฅ
- photo์ userId๋ฅผ ์ ๋ฌ๋ฐ์์ ์ฌ์ฉํจ(์ฒซ๋ฒ์งธ arg๋ parent์ userId์)
  ์์ปจ๋ฐ Comment์์ ๋ฌด์์ธ๊ฐ query, mutation์ ์ฌ์ฉ์ ํด๋น ํ์ด๋ธ์ field์ค userId๊ฐ ์กด์ฌํ๋ค๋ฉด query, mutation์ ์ฌ์ฉํ ๋ ์ฒซ๋ฒ์งธ args๋ก ์ ๋ฌ๋ฐ์์ ์๋ค
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
  <!-- ์ด๋ฐ ํ์์ -->
  ```

# 6.16 Delete Comment and Photos

- ํน์  photo์ comment๋ฅผ ์ฐพ์์ ์ญ์ ํ๋ ๊ธฐ๋ฅ

# 6.17 editComment

- shared ํด๋์ ๋ด์๋ typeDefs๋ ๊ณต์ ๋จ

# 6.18 protectedResolver Refactor

- info args ์ฌ์ฉ๋ฒ
  info : ํ์ฌ ์์์ค์ธ ์ฟผ๋ฆฌ๋๋ ๋ฎคํ์ด์์ ์ ๋ณด๋ฅผ ๋ด๊ณ ์์

# change return type

- MutationResponse type

# 6.19 S3 Photo Upload

aws s3 ์ ์ฌ์ง ์๋ก๋ํ๊ธฐ

- npm i aws-sdk
  https://www.npmjs.com/package/aws-sdk

- s3 ์ฌ์ฉ๋ฒ ์ตํ๊ธฐ

# 6.21 S3 Photo Upload part Three

uploadPhoto์๋ ์ค์ ๋ก S3์๋ฒ์ ์๋ก๋ํ๋๋ฐฉ๋ฒ ์ถ๊ฐ ๋ฐ ๊ฒฝ๋ก ์ค์ 

# s3์์ ์ฌ์ง์ ์ง์ฐ๊ณ  ์ถ์๋

```
export const deleteInS3 = async (fileUrl) => {
const Key = fileUrl.replace(
'https://๋ฒํท์ด๋ฆ.s3.amazonaws.com/',
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

- room ํ์ด๋ธ์์ ๋ก๊ทธ์ธํ ์ ์ ์ ๋ชจ๋  ๋ฐฉ์ ์ฐพ๋๋ค

# 7.3 sendMessage

- ๋ฉ์์ง๋ฅผ ๋ณด๋ผ ๋์์ ์ฌ์ฉ์๋ง ์กด์ฌํ๋ฉด(์ด๋ฏธ ๋ฐฉ์ด ๋ง๋ค์ด์ง์ง ์์๊ฒฝ์ฐ) room ์์ฑ

- ๋ฉ์์ง๋ฅผ ๋ณด๋ผ๊ป๋ฐ ์ด๋ฏธ room์ด ์กด์ฌํ๋๊ฒฝ์ฐ roomId๋ฅผ ์ ๋ฌ๋ฐ์ message๋ฅผ room๊ณผ user์ ์ฐ๊ฒฐํ๋ค

- room์ด ์๊ณ  ๋์ userId๋ง ์์ผ๋ฉด ์๋กญ๊ฒ ๋ฐฉ์ ๋ง๋ ๋ค์ ๋ฉ์์ง๋ฅผ ๋ณด๋ผ ๋์ user์ ๋ก๊ทธ์ธํ ์ ์ ์ user๋ฅผ connectํด์ค๋ค.

- ๋ง์ง๋ง์ผ๋ก ๋ฉ์์ง๋ฅผ ์์ฑํ๋ค์ room๊ณผ ๋ก๊ทธ์ธํ User๋ฅผ ์ฐ๊ฒฐํด์ค๋ค.

# 7.4 seeRoom

- ๋์ ๋ํ์ค์ธ ํน์  ๋ฐฉ์ ์ฐพ์, ์ด๋ users์ ๋ก๊ทธ์ธํ ์ ์ ์ id๊ฐ ํฌํจ๋ผ์ผํ๊ธฐ ๋๋ฌธ์ findFirst๋ฅผ ์ฌ์ฉ
  (findUnique๋ ํ๊ฐ์์ ๋ํฌํ ์ปฌ๋ผ๋ง์ผ๋ก ๊ฒ์๊ฐ๋ฅ)

# 7.5 readMessage

- ์์ฝ์ ๋ฉ์์ง๋ฅผ ์ฝ๋ ์๊ฐ read :true๋ก ๋ณํ์์ผ์ค

- ๋ด๊ฐ ๋ํ๋ฐฉ์ ๋ค์ด๊ฐ์๊ณ  ๋ด๊ฐ ๊ทธ๋ฉ์์ง๋ฅผ ๋ณด๋ธ ์ฌ์ฉ์๊ฐ ์๋๋
  ๊ทธ๋ฆฌ๊ณ  ๋ด๊ฐ ๊ทธ ๋ฉ์์ง๊ฐ ๋ณด๋ด์ง๊ฑธ ์๊ณ  ์์๋
  ๊ทธ ๋ฉ์์ง๋ฅผ ์ฝ์ ํ์ ํ  ์ ์๋ค.

# ๋ค๋ฅธ ํ์ด๋ธ์ ๋ด์ฉ์ ๋ถ๋ฌ์ฌ๋ computed field๋ก ์ฒ๋ฆฌํ๋ ์ด์ ๋

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

์ด๋ฐ์์ผ๋ก ๋ฌดํ์ ๊น์ด๋ก ๋น ์ง์ง ์๊ฒ ๋ง๋ค๊ธฐ ์ํด ๋ค๋ฅธ ํ์ด๋ธ ์ ๊ทผ์๋ computed field(์๋๊ณ์ฐ)๋ก ์ฒ๋ฆฌํด์ค๋ค

# 7.7 Subscriptions Setup part One

- subscription์ ์๋ฒ์์๋ ๊ฒ์ด ๋ฌด์์ด๋  ํญ์ listenํ  ์ ์๊ฒ ํด์ค
- ์ค์๊ฐ์ด๊ณ  ์น์์ผ ๊ธฐ๋ฐ์
- subscriptionsํ ๋ ํ์ ์กฐ๊ฑด์ค ํ๋๋ pubsub class๊ฐ ์์ด์ผ ํจ
- but pubsub์ prod์ฉ์ผ๋ก  ์ ํฉํ์ง ์๊ณ  Redis pubsub์๋ฒ๋ฅผ ์ฌ์ฉํ๋๊ฒ prod ์ฉ์ผ๋ก ์ข์
- ๋๋ด๋๊ฑฐ ๋ง๊ณ ๋ ๋๊ฐ์ด ์๋ํจ (์ฌ์ฉ๋ฒ๋ ๋น์ทํจ)
- https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries ์ฐธ๊ณ 

- ์น์์ผ์ ๋ํ ์ ๋ณด๋ฅผ ์ฐ๋ฆฌ ์๋ฒ์ ์ค์น

# 7.8 Subscriptions Setup part Two

subscriptions ์ฌ์ฉ์ํ ํ๊ฒฝ ์ค์ 

- subscription์ pubsub.publish ์ ์ฌ์ฉ๋ฒ์
  ํธ๋ฆฌ๊ฑฐ์ typedef์์ ์ง์ ํ subscription ์ด๋ฆ ์ด๋ค.

```
    pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });

```

# 7.9 Filtering Subscriptions part One

- withFilter๋ฅผ ์ด์ฉํ์ฌ Subscriptions์ ์กฐ๊ฑด์ ๋ง๋ค์ด์ค

# 7.10 Filtering Subscriptions part Two

- roomId๋ฅผ ๊ฐ์ง๊ณ  subscriptions์ค ๋ฐฉ์ด ์๋๊ฒฝ์ฐ ํธ๋ค๋ง
- ์์ ์ปดํฌ๋ํธ์์ ์ ๋ฌ๋ฐ์ง ์์ ํจ์๋ฅผ ๊ณ ์ฐจ์ปดํฌ๋ํธ ํ์์ผ๋ก ์ฌ์ฉํ๊ณ  ์ถ์๋ ํจํด

# 7.11 Authenticating Subscriptions

- onConnect ์ฌ์ฉ๋ฒ
  user๊ฐ ์ฐ๊ฒฐ๋์๋ ๋ญ๊ฐ๋ฅผ ํด์ค์ ์๋ ๊ธฐ๋ฅ
  ์ฌ๊ธฐ์ http header๋ฅผ ์ ๋ฌ๋ฐ์ ํธ๋ค๋งํ ์ ์๋ค.
- https://www.apollographql.com/docs/apollo-server/data/subscriptions/#onconnect-and-ondisconnect ์ฐธ๊ณ 

-

# isLiked

- ๋ด๊ฐ ํด๋น feed์ like๋ฅผ ํ๋์ง ์ฌ๋ถ
- likeํ์ด๋ธ์์ ์ฐ๊ฒฐ๋ photoId์ userId๋ฅผ ์ฐพ์์ ํด๋น์กฐ๊ฑด์ ๋ง์กฑํ๋ like๊ฐ ์์ผ๋ฉด true๋ฅผ ๋ฐํํ๊ณ  ์์ผ๋ฉด false๋ฅผ ๋ฐํํ๋ค.

# Comment number for photo's computed field

# fix Comments function

# change seeFeed for infinite scrolling

- # 15.10

- # 16.6 fix searchPhotos resovers

  searchPhotos์์ ๊ฒ์์ startsWitth๊ฐ ์๋ contains๋ก ๊ฒ์
  startsWith : ๊ฒ์์ด์ ์์๋ถ๋ถ์ด ๊ผญ ๊ฐ์์ผ ๊ฒ์๋จ
  contains : ๊ฒ์์ด์ ์ด๋ ๋ถ๋ถ์ด๋  ๊ฒน์น๋ ๋ถ๋ถ์ด ์กด์ฌํ๋ฉด ๊ฒ์๋จ

- seePhotoComments ์ include:{ user:true } ์ค์ 
  ๊ทธ๋์ผ comments ์์ user์ ๋ณด ๋ถ๋ฌ์ฌ์ ์์

# upload๋ฌธ์  ํด๊ฒฐ ๋ฐฉ๋ฒ๋ค

http://blog.naver.com/PostView.nhn?blogId=yui050505&logNo=222286087137&categoryNo=177&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView

# babel/node๋ prodiuction์์ ์ฌ์ฉ๋ชปํจ

# babel์ package.json์ผ๋ก ๋ถํฐ ์คํํ ์ ์๋๋ก ๋ง๋ค์ด์ค

npm install @babel/cli --dev-only

# package.json

"build": "babel src --out-dir build",

- babel๋ก ๋น๋ํ๊ณ  srcํด๋ ์์์๋๊ฑธ ๋น๋ํด์ ๋ฐ๊นฅ directory์์ buildํด๋์์ ๋น๋ํ ํ์ผ์ ๋ชจ์๋ฌ๋ผ๋ ๋ป

- and npm run build

- https://babeljs.io/docs/en/babel-plugin-transform-runtime

- npm install --save-dev @babel/plugin-transform-runtime
- npm install --save @babel/runtime
- babel.config ์ค์ 
  "plugins": ["@babel/plugin-transform-runtime"]

# babel cli์ค์น

# 19.0 Building the Server

# #19.1 Deploy to Heroku part One

- heroku cli ์์น
- heroku cli login

```
Create a new Git repository
Initialize a git repository in a new or existing directory

$ cd my-project/
$ git init
$ heroku git:remote -a instaclone-backend-v3
Deploy your application
Commit your code to the repository and deploy it to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

# ์ค์น ์ ๋ณด๋ฐ ์๋ฌ์ ๋ณด ์ธํ ์ ๋ณด๋ฑ๋ฑ ์ป์์ ์์

# 19.2 Deploy to Heroku part Two

- heroku logs --tail์์
  ํน์ ๋ชจ๋์ ์ฐพ์์ ์๋ค๋ ๋ฒ๊ทธ๊ฐ ๋ฌ๋ค๋ฉด dependency์ ๋ชจ๋์ ์ถ๊ฐํด์ฃผ๋ฉด๋จ

- process.env.NODE_ENV === "production"
  heroku์์์  ์๋์ผ๋ก ์ด๋ ๊ฒ ๋จ
  ๋ฐ๋ผ์ ์ํด๋ก ์๋ฒ๋ ์๋์ผ๋ก playground๋ฅผ false์์ผ์ค

- playground๋ฅผ ํ์ฑํ ํด์ค(server.js)

# heroku

- settings -Reveal Config Vars
  env๋ณ์ ๋ฑ๋ก

- overview - Configure Add-ons
  postgres ๋ฌด๋ฃ๋ฒ์ ผ ๋ฑ๋ก
  Reveal Config Vars์ DB URL์ด ์๋์ผ๋ก ์ถ๊ฐ๋จ
- prisma migrate๋ฅผ heroku postgres์ ์งํํ๊ธฐ
  prisma migrate deploy
  https://www.prisma.io/docs/guides/deployment/deploy-database-changes-with-prisma-migrate
  https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-heroku/

- release phase ์ ์ฉ
  heroku ์์์ database migration์ ์๋์ํฌ์ ์๋ comand
  https://devcenter.heroku.com/articles/release-phase

- ์ฑ์คํ์  ์๋ํด์ผํ  ์์์ Procfile์ ์ง์ ํด๋๋ ๊ฒ
  (migrate๋ฅผ ์งํ ํ npm start ์งํ)
  release: prisma migrate deploy
  web: npm start

- add npx

- gitignore์์ prisma ์ ํ ํด์ 

# heroku - github connect

- enable automatic deploys
  ๊น์ฐ๊ฒฐ ํ ๋ง์คํฐ์ push ํ ๋ ์๋์ผ๋ก deploy๋๊ฒ ์ค์ 
