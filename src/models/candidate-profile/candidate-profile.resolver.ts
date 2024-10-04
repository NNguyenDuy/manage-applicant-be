import { candidateProfileController } from './candidate-profile.controller'
import { I_CandidateProfile } from './candidate-profile.types'

export const candidateProfileResolvers = {
  Query: {
    getAllCandidateProfiles: async (): Promise<I_CandidateProfile[]> => {
      return await candidateProfileController.getAllCandidateProfiles()
    },
    getCandidateProfileById: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_CandidateProfile | null> => {
      return await candidateProfileController.getCandidateProfileById(id)
    },
  },
  Mutation: {
    createCandidateProfile: async (
      _: any,
      {
        skills,
        experience,
        cvUrl,
      }: {
        skills: string[]
        experience: string
        cvUrl: string[]
      }
    ): Promise<{ message: string; data: I_CandidateProfile }> => {
      return await candidateProfileController.createCandidateProfile(
        skills,
        experience,
        cvUrl
      )
    },
    updateCandidateProfile: async (
      _: any,
      {
        id,
        skills,
        experience,
        cvUrl,
      }: {
        id: string
        skills?: string[]
        experience?: string
        cvUrl?: string[]
      }
    ): Promise<I_CandidateProfile | null> => {
      return await candidateProfileController.updateCandidateProfile(
        id,
        skills,
        experience,
        cvUrl
      )
    },
    deleteCandidateProfile: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_CandidateProfile | null> => {
      return await candidateProfileController.deleteCandidateProfile(id)
    },
  },
}
