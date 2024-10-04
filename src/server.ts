import express, { Express } from 'express'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import schema from './shared/graphql/schema'
import config from './config'
import { seedData } from './seed'
import { run } from './models/AI/evaluate-cv'

const app: Express = express()

async function startServer() {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      req,
    }),
  })

  await server.start()
  server.applyMiddleware({ app })

  app.get('/', (req, res) => {
    res.send('Server on')
  })

  run()

  // try {
  //   await mongoose.connect(config.mongoURL)
  //   console.log('Connected to MongoDB')

  //   await checkAndSeedDatabase()
  // } catch (error) {
  //   console.error('Error connecting to MongoDB:', error)
  //   process.exit(1)
  // }

  app.listen(config.port, () => {
    console.log(
      `Server listening on port http://localhost:${config.port}${server.graphqlPath}`
    )
  })
}

async function checkAndSeedDatabase() {
  if (!mongoose.connection || !mongoose.connection.db) {
    throw new Error('Database connection is not established.')
  }

  const userCount = await mongoose.connection.db
    .collection('users')
    .countDocuments()
  if (userCount === 0) {
    console.log('No users found, importing seed data...')
    await seedData()
  }
}

startServer()

export default app
