import { I_CandidateProfile } from './candidate-profile.types'
import {
  CandidateProfileModel,
  ICandidateProfileDocument,
} from './candidate-profile.model'

export const candidateProfileController = {
  createCandidateProfile: async (
    candidateProfileData: I_CandidateProfile
  ): Promise<ICandidateProfileDocument> => {
    const candidateProfile = new CandidateProfileModel(candidateProfileData)
    return await candidateProfile.save()
  },

  getCandidateProfiles: async (): Promise<ICandidateProfileDocument[]> => {
    return await CandidateProfileModel.find()
  },

  getCandidateProfileById: async (
    id: string
  ): Promise<ICandidateProfileDocument | null> => {
    return await CandidateProfileModel.findOne({ _id: id })
  },

  deleteCandidateProfile: async (
    id: string
  ): Promise<ICandidateProfileDocument | null> => {
    return await CandidateProfileModel.findByIdAndUpdate(
      id,
      { idDel: true },
      { new: true }
    )
  },

  updateCandidateProfile: async (
    id: string,
    profileData: Partial<I_CandidateProfile>
  ): Promise<ICandidateProfileDocument | null> => {
    return await CandidateProfileModel.findByIdAndUpdate(
      id,
      { resume: profileData },
      { new: true }
    )
  },
}
