import { I_CandidateProfile } from './candidate-profile.types'
import { CandidateProfileModel } from './candidate-profile.model'

export const candidateProfileController = {
  getAllCandidateProfiles: async (): Promise<I_CandidateProfile[]> => {
    return await CandidateProfileModel.find()
  },

  getCandidateProfileById: async (
    id: string
  ): Promise<I_CandidateProfile | null> => {
    return await CandidateProfileModel.findById(id)
  },

  createCandidateProfile: async (
    skills: string[],
    experience: string,
    cvUrl: string[]
  ): Promise<{ message: string; data: I_CandidateProfile }> => {
    const newProfile = new CandidateProfileModel({ skills, experience, cvUrl })
    const savedProfile = await newProfile.save()
    return {
      message: 'Candidate profile created successfully.',
      data: savedProfile.toObject(),
    }
  },

  updateCandidateProfile: async (
    id: string,
    skills?: string[],
    experience?: string,
    cvUrl?: string[]
  ): Promise<I_CandidateProfile | null> => {
    return await CandidateProfileModel.findByIdAndUpdate(
      id,
      { skills, experience, cvUrl },
      { new: true }
    )
  },

  deleteCandidateProfile: async (
    id: string
  ): Promise<I_CandidateProfile | null> => {
    return await CandidateProfileModel.findByIdAndDelete(id)
  },
}
