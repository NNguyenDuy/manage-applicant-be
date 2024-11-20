import mongoose from 'mongoose'

export enum E_Role {
  ADMIN = 'admin',
  RECRUITER = 'recruiter',
  CANDIDATE = 'candidate',
}

export interface I_User {
  fullName?: string
  email: string
  password: string
  role: E_Role
  candidateId?: mongoose.Types.ObjectId 
  companyId?: mongoose.Types.ObjectId | null
  idDel?: boolean
}
