import { Schema, model, Document } from 'mongoose'
import { I_CandidateProfile } from './candidate-profile.types'

export interface ICandidateProfileDocument
  extends I_CandidateProfile,
    Document {}

const CandidateProfileSchema = new Schema<ICandidateProfileDocument>({
  resume: {
    cvLinks: [{ type: String, required: true , default:[]}],
    skills: [
      {
        name: { type: String, required: true, default:null },
        experience: { type: Number, required: true, default:null },
      },
    ]
  },
  idDel: { type: Boolean, default: false },
})

export const CandidateProfileModel = model<ICandidateProfileDocument>(
  'CandidateProfile',
  CandidateProfileSchema
)
