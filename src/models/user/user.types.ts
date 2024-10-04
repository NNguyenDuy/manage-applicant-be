import { I_Company } from './../company/company.types'
import { I_CandidateProfile } from './../candidate-profile/candidate-profile.types'
import { ObjectId } from 'mongoose'
export interface I_User {
  fullName?: string
  email: string
  password: string
  role?: 'admin' | 'recruiter' | 'candidate'
  companyId?: ObjectId
  profileId?: ObjectId
  candidateProfile?: I_CandidateProfile
  company?: I_Company
}
