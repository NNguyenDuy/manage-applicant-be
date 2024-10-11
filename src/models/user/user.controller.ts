import { I_User } from './user.types'
import { CandidateProfileModel } from '../candidate-profile'
import { CompanyModel } from '../company'
import { UserModel, IUserDocument } from './user.model'
import bcrypt from 'bcrypt'

export const userController = {
  getAllUsers: async (): Promise<I_User[]> => {
    return await UserModel.find().select('-password')
  },

  getUser: async (
    email: string,
    password: string
  ): Promise<IUserDocument | null> => {
    const user = await UserModel.findOne({ email })
    if (!user) return null

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return null

    return user
  },
  getInfoUser: async (userId: string): Promise<I_User | null> => {
    const user = await UserModel.findById(userId).select('-password')

    if (!user) {
      return null
    }

    const candidateProfile = user.candidateProfile
      ? await CandidateProfileModel.findById(user.candidateProfile)
      : undefined

    const company = user.company
      ? await CompanyModel.findById(user.company)
      : undefined

    return {
      ...user.toObject(),
      candidateProfile: candidateProfile?.toObject(),
      company: company?.toObject(),
    }
  },
  createUser: async (
    user: I_User
  ): Promise<{ message: string; data: I_User | null }> => {
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
