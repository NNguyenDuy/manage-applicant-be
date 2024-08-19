import express, { Express } from 'express'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import schema from './shared/graphql/schema'
import config from './config'

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

  mongoose
    .connect(config.mongoURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error))

  app.listen(config.port, () => {
    console.log(
      `Server listening on port http://localhost:${config.port}${server.graphqlPath}`
    )
  })
}

startServer()

export default app
