import { I_User } from './user.types'
import { CandidateProfileModel } from '../candidate-profile'
import { CompanyModel } from '../company'
import { UserModel } from './user.model'
import bcrypt from 'bcrypt'

export const userController = {
  getAllUsers: async (): Promise<I_User[]> => {
    return await UserModel.find().select('-password')
  },

  getUser: async (
    email: string,
    password: string
  ): Promise<{ _id: string } | null> => {
    const user = await UserModel.findOne({ email })
    if (!user) return null

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return null

    return user.toObject()
  },
  getInfoUser: async (_id: string): Promise<I_User | null> => {
    const user = await UserModel.findById(_id).select('-password')

    if (!user) {
      return null
    }

    let candidateProfile: I_User['candidateProfile'] = undefined
    if (user.profileId) {
      const profile = await CandidateProfileModel.findById(user.profileId)
      if (profile) {
        candidateProfile = profile.toObject()
      }
    }

    let company: I_User['company'] = undefined
    if (user.companyId) {
      const companyDoc = await CompanyModel.findById(user.companyId)
      if (companyDoc) {
        company = companyDoc.toObject()
      }
    }

    return {
      ...user.toObject(),
      candidateProfile,
      company,
    }
  },
  createUser: async (
    user: I_User
  ): Promise<{ message: string; data: I_User | null }> => {
    try {
      const existingUser = await UserModel.findOne({ email: user.email })
      if (existingUser) {
        return {
          message: 'Email already exists.',
          data: null,
        }
      }

      const newUser = new UserModel(user)
      const savedUser = await newUser.save()

      return {
        message: 'User created successfully.',
        data: savedUser.toObject(),
      }
    } catch (error) {
      return {
        message: 'Failed to create user. Please try again later.',
        data: null,
      }
    }
  },

  updateUser: async (
    id: string,
    user: Partial<I_User>
  ): Promise<I_User | null> => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password, salt)
    }
    return await UserModel.findByIdAndUpdate(id, user, { new: true }).select(
      '-password'
    )
  },

  deleteUser: async (id: string): Promise<I_User | null> => {
    return await UserModel.findByIdAndDelete(id).select('-password')
  },
}
