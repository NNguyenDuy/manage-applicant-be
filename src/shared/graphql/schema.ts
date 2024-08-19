import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { applyMiddleware } from 'graphql-middleware'
import { candidateProfileResolvers } from '../../models/candidate-profile'
import { userResolvers } from '../../models/user'
import { authResolvers } from './../../models/auth'
import { jobResolvers } from '../../models/job'
import { companyResolvers } from '../../models/company'
import { authenticate } from './authenticate'

const typesArray = loadFilesSync('src/models/**/*.graphql')

const typeDefs = mergeTypeDefs(typesArray)

const resolvers = mergeResolvers([
  userResolvers,
  authResolvers,
  candidateProfileResolvers,
  jobResolvers,
  companyResolvers,
])

const configMiddleware = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  await authenticate(context.req)
  return resolve(parent, args, context, info)
}

const middleware = {
  Query: {
    getAllUsers: configMiddleware,
  },
  Mutation: {},
}

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  middleware
)

export default schema
