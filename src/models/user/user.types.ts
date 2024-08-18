import { ObjectId } from 'mongoose'

export interface I_User {
  fullName?: string
  email: string
  password: string
  role: 'admin' | 'recruiter' | 'candidate'
  companyId?: ObjectId
  profileId?: ObjectId
}
