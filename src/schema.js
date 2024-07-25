import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
// 프로젝트 내 모든 .typeDefs.js 파일
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
// 프로젝트 내 모든 .resolvers.js 파일
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

// 위에서 가져온 파일들 병합
const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

// graphql schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  inheritResolversFromInterfaces: true,
});

export default schema;
