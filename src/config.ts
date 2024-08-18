import dotenv from 'dotenv'
dotenv.config()

const getMongoURL = (): string => {
  const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env
  return `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
}

const config = {
  port: process.env.PORT || 5001,
  mongoURL: getMongoURL(),
}

export default config
