import { userController } from './user.controller'
import { I_User } from './user.types'

export const userResolvers = {
  Query: {
    getAllUsers: async (): Promise<I_User[]> => {
      return await userController.getAllUsers()
    },
    getUser: async (
      _: any,
      { email, password }: { email: string; password: string }
    ): Promise<I_User | null> => {
      return await userController.getUser(email, password)
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        email,
        password,
        role,
      }: { email: string; password: string; role: string }
    ): Promise<{ message: string; data: I_User | null }> => {
      const validRoles: ('admin' | 'recruiter' | 'candidate')[] = [
        'admin',
        'recruiter',
        'candidate',
      ]
      if (!validRoles.includes(role as 'admin' | 'recruiter' | 'candidate')) {
        return {
          message: 'Invalid role provided.',
          data: null,
        }
      }
      const result = await userController.createUser({
        email,
        password,
        role: role as 'admin' | 'recruiter' | 'candidate',
      })
      return result
    },
    updateUser: async (
      _: any,
      {
        id,
        fullName,
        email,
        password,
      }: {
        id: string
        fullName?: string
        email?: string
        password?: string
      }
    ): Promise<I_User | null> => {
      return await userController.updateUser(id, {
        fullName,
        email,
        password,
      })
    },
    deleteUser: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_User | null> => {
      return await userController.deleteUser(id)
    },
  },
}
