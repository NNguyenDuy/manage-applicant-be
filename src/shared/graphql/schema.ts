import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { userResolvers } from '../../models/user/user.resolver'

const typesArray = loadFilesSync('src/models/**/*.graphql')

const typeDefs = mergeTypeDefs(typesArray)

const resolvers = mergeResolvers([userResolvers])

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default schema
