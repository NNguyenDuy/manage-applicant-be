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
import { jobTypeResolvers } from '../../models/job-type'
import { locationResolvers } from '../../models/location'
import { jobCategoryResolvers } from '../../models/job-category'
import { applicationResolvers } from '../../models/application'
const typesArray = loadFilesSync('src/models/**/*.graphql')

const typeDefs = mergeTypeDefs(typesArray)

const resolvers = mergeResolvers([
  userResolvers,
  authResolvers,
  candidateProfileResolvers,
  jobResolvers,
  companyResolvers,
  jobTypeResolvers,
  locationResolvers,
  jobCategoryResolvers,
  applicationResolvers,
])

const middleware = {
  Query: {
    getInfoUser: authenticate,
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
