import { candidateProfileController } from './candidate-profile.controller'
import { I_CandidateProfile } from './candidate-profile.types'

export const candidateProfileResolvers = {
  Query: {
    getCandidateProfiles: async () => {
      return await candidateProfileController.getCandidateProfiles()
    },
    getCandidateProfileById: async (_: any, { id }: { id: string }) => {
      return await candidateProfileController.getCandidateProfileById(id)
    },
  },
  Mutation: {
    createCandidateProfile: async (
      _: any,
      { resume }: { resume: I_CandidateProfile }
    ) => {
      return await candidateProfileController.createCandidateProfile(resume)
    },
    deleteCandidateProfile: async (_: any, { id }: { id: string }) => {
      return await candidateProfileController.deleteCandidateProfile(id)
    },
    updateCandidateProfile: async (
      _: any,
      { id, resume }: { id: string; resume: Partial<I_CandidateProfile> }
    ) => {
      return await candidateProfileController.updateCandidateProfile(id, resume)
    },
  },
}
