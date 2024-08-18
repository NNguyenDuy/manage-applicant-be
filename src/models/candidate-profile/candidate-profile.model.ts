import { I_CandidateProfile } from './candidate-profile.types'
import mongoose, { Schema } from 'mongoose'

const CandidateProfileSchema = new Schema<I_CandidateProfile>({
  skills: [{ type: String, required: true }],
  experience: {
    type: String,
    enum: [
      'Under 1 Year',
      '1-2 Years',
      '2-3 Years',
      '3-4 Years',
      'Over 5 years',
    ],
    required: true,
  },
  cvUrl: [{ type: String }],
})

export const CandidateProfileModel = mongoose.model<I_CandidateProfile>(
  'CandidateProfile',
  CandidateProfileSchema
)
