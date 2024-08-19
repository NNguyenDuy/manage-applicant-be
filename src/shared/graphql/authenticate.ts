import jwt from 'jsonwebtoken'
import { Request } from 'express'
import { AuthenticationError } from 'apollo-server-express'

export const authenticate = (req: Request) => {
  const token = req.headers.authorization || ''

  if (!token) {
    throw new AuthenticationError('Authentication token missing')
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || '') as {
      userId: string
    }
    return { userId: decoded.userId }
  } catch (error) {
    throw new AuthenticationError('Invalid or expired token')
  }
}
