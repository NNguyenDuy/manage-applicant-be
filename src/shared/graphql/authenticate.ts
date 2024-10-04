import { AuthenticatedRequest } from './../../models/auth'
import jwt from 'jsonwebtoken'
import { GraphQLResolveInfo } from 'graphql'

export const authenticate = async (
  resolve: any,
  parent: any,
  args: any,
  context: { req: AuthenticatedRequest },
  info: GraphQLResolveInfo
) => {
  const token = (context.req.headers as any).authorization
  if (!token) {
    throw new Error('Authentication token is missing')
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || '') as {
      userId: string
    }
    context.req.userId = decoded.userId
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired')
    }
    throw new Error('Invalid authentication token')
  }

  return resolve(parent, args, context, info)
}
