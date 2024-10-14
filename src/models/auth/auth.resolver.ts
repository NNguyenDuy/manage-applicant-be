import { I_CompanyInput } from './auth.types'
import jwt from 'jsonwebtoken'
import { E_Role, userController } from './../user'
import { IUserDocument, UserModel } from '../user/user.model'
import { CompanyModel, ICompanyDocument } from '../company/company.model'
import { ILocationDocument, LocationModel } from '../location/location.model'

export const authResolvers = {
  Mutation: {
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ): Promise<{ token: string } | null> => {
      const user: IUserDocument | null = await userController.getUser(
        email,
        password
      )
      if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng.')
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY || '',
        {
          expiresIn: '3d',
        }
      )
      return { token }
    },

    register: async (
      _: any,
      {
        email,
        password,
        role,
        fullName,
        company,
      }: {
        email: string
        password: string
        fullName: string
        role: E_Role
        company?: I_CompanyInput
      }
    ): Promise<{ token: string }> => {
      const existingUser = await UserModel.findOne({ email })
      if (existingUser) {
        throw new Error('Email đã được sử dụng.')
      }

      let user: IUserDocument = new UserModel({
        email,
        password,
        fullName,
        role,
      })
      await user.save()

      if (role === E_Role.RECRUITER && company) {
        let location: ILocationDocument | undefined

        if (company.location) {
          location = (await LocationModel.create(
            company.location
          )) as ILocationDocument
        }

        if (company.name)
          (await CompanyModel.create({
            name: company.name,
            locationId: location ? location._id : undefined,
          })) as ICompanyDocument

        await user.save()
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY || '',
        {
          expiresIn: '3d',
        }
      )

      return { token }
    },
  },
}
