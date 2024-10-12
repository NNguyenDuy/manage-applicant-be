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
      if (!user) return null

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

      let user: IUserDocument

      if (role === E_Role.CANDIDATE) {
        user = new UserModel({ email, password, fullName, role })
        await user.save()
      } else if (role === E_Role.RECRUITER && company) {
        let location: ILocationDocument | undefined

        if (company.location) {
          location = (await LocationModel.create(
            company.location
          )) as ILocationDocument
        }

        user = new UserModel({ email, password, fullName, role })
        await user.save()

        const newCompany = (await CompanyModel.create({
          name: company.name,
          ownerId: user._id,
          locationId: location ? location._id : undefined,
        })) as ICompanyDocument

        user.company = newCompany
        await user.save()
      } else {
        throw new Error('Thông tin đăng ký không hợp lệ.')
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY || '',
        { expiresIn: '3d' }
      )

      return { token }
    },
  },
}
