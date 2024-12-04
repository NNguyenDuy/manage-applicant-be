import { I_CandidateProfile } from '../candidate-profile'
import { candidateProfileController } from '../candidate-profile/candidate-profile.controller'
import { I_Company } from '../company'
import { companyController } from '../company/company.controller'
import { userController } from './user.controller'
import { E_Role, I_User } from './user.types'

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
    getInfoUser: async (
      _: any,
      __: any,
      context: { req: { userId: string } }
    ): Promise<I_User | null> => {
      const { userId } = context.req
      return await userController.getInfoUser(userId)
    },
  },
  User: {
    candidate: async (parent: I_User): Promise<I_CandidateProfile | null> => {
      if (!parent.candidateId) return null
      return await candidateProfileController.getCandidateProfileById(
        parent.candidateId.toString()
      )
    },
    company: async (parent: I_User): Promise<I_Company | null> => {
      if (!parent.companyId) return null
      return await companyController.getCompanyById(parent.companyId.toString())
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        fullName,
        email,
        password,
        role,
        isDel,
      }: {
        fullName?: string
        email: string
        password: string
        role: E_Role
        isDel?: boolean
      }
    ): Promise<{ message: string; data: I_User | null }> => {
      return await userController.createUser({
        fullName,
        email,
        password,
        role,
        isDel,
      })
    },
    updateUser: async (
      _: any,
      {
        id,
        fullName,
        email,
        password,
        role,
        isDel,
      }: {
        id: string
        fullName?: string
        email?: string
        password?: string
        role?: E_Role
        isDel?: boolean
      }
    ): Promise<I_User | null> => {
      return await userController.updateUser(id, {
        fullName,
        email,
        password,
        role,
        isDel,
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
