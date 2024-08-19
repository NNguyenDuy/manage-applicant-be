import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-express'
import { I_User, userController } from './../user'

export const authResolvers = {
  Mutation: {
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ): Promise<{ token: string; user: I_User } | null> => {
      const user = await userController.getUser(email, password)
      if (!user) {
        return null
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY || '',
        {
          expiresIn: '1h',
        }
      )
      return {
        token,
        user,
      }
    },
  },
}
