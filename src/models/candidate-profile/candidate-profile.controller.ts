import { I_CandidateProfile } from './candidate-profile.types';
import { CandidateProfileModel } from './candidate-profile.model';

export const candidateProfileController = {
  getAllCandidateProfiles: async (): Promise<I_CandidateProfile[]> => {
    return await CandidateProfileModel.find().populate('applications').exec();
  },

  getCandidateProfile: async (id: string): Promise<I_CandidateProfile | null> => {
    return await CandidateProfileModel.findById(id).populate('applications').exec();
  },

  createCandidateProfile: async (
    profile: I_CandidateProfile
  ): Promise<{ message: string; data: I_CandidateProfile | null }> => {
    const newProfile = new CandidateProfileModel(profile);
    const savedProfile = await newProfile.save();

    return {
      message: 'Candidate profile created successfully.',
      data: savedProfile.toObject(),
    };
  },

  updateCandidateProfile: async (
    id: string,
    profileData: Partial<I_CandidateProfile>
  ): Promise<I_CandidateProfile | null> => {
    return await CandidateProfileModel.findByIdAndUpdate(id, profileData, { new: true }).exec();
  },

  deleteCandidateProfile: async (id: string): Promise<I_CandidateProfile | null> => {
    return await CandidateProfileModel.findByIdAndDelete(id).exec();
  },
};
