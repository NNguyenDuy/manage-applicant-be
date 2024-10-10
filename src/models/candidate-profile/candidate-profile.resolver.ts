import { candidateProfileController } from './candidate-profile.controller';
import { I_CandidateProfile } from './candidate-profile.types';
import mongoose from 'mongoose';

export const candidateProfileResolvers = {
  Query: {
    getAllCandidateProfiles: async (): Promise<I_CandidateProfile[]> => {
      return await candidateProfileController.getAllCandidateProfiles();
    },
    getCandidateProfile: async (_: any, { id }: { id: string }): Promise<I_CandidateProfile | null> => {
      return await candidateProfileController.getCandidateProfile(id);
    },
  },
  Mutation: {
    createCandidateProfile: async (
      _: any,
      { userId, resume }: { userId: string; resume: any }
    ): Promise<{ message: string; data: I_CandidateProfile | null }> => {
      const objectIdUserId = new mongoose.Types.ObjectId(userId);
      return await candidateProfileController.createCandidateProfile({ userId: objectIdUserId, resume });
    },
    updateCandidateProfile: async (
      _: any,
      { id, resume }: { id: string; resume?: any }
    ): Promise<I_CandidateProfile | null> => {
      return await candidateProfileController.updateCandidateProfile(id, { resume });
    },
    deleteCandidateProfile: async (_: any, { id }: { id: string }): Promise<I_CandidateProfile | null> => {
      return await candidateProfileController.deleteCandidateProfile(id);
    },
  },
};
