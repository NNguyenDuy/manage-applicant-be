import { I_Company } from './../company/company.types'
import { I_CandidateProfile } from './../candidate-profile/candidate-profile.types'

export enum E_Role {
  ADMIN = 'admin',
  RECRUITER = 'recruiter',
  CANDIDATE = 'candidate',
}

export interface I_User {
  fullName?: string
  email: string
  password: string
  role?: E_Role
  candidateProfile?: I_CandidateProfile
  company?: I_Company
}
