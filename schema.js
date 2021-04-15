// import { loadFilesSync, mergeTypedefs ,merge} from 'graphql-tools';
// 파일 찾기

const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// __dirname / root의 모든 폴더안(**)을 살펴본다 / 그 하위의 모든 파일(*)을 살펴보고 이어지는 파일이름명은 .typeDefs.js 인 파일을 찾음
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
// __dirname / root의 모든 폴더안(**)의 / 모든 파일(*)을 살펴보고 이어지는 파일명은 .뒤에 queries또는 mutation이 이어지고 마지막 확장자는.js 로 끝나는 파일을 찾음

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

// 위에서 파일을 찾은다음 그 파일들을 merge 하는 단계(typedefs와 resolvers 파일들)

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

// // 위에서 merge한 파일들을 하나의 스키마로 만들어주는 단계
// const schema = makeExecutableSchema({ typeDefs, resolvers });

// export default schema;
