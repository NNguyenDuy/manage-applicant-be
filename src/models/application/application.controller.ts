import { I_Application } from './application.types';
import { ApplicationModel } from './application.model';

export const applicationController = {
  getAllApplications: async (): Promise<I_Application[]> => {
    return await ApplicationModel.find().populate('jobId candidateProfileId').exec();
  },

  getApplication: async (id: string): Promise<I_Application | null> => {
    return await ApplicationModel.findById(id).populate('jobId candidateProfileId').exec();
  },

  createApplication: async (
    application: I_Application
  ): Promise<{ message: string; data: I_Application | null }> => {
    const newApplication = new ApplicationModel(application);
    const savedApplication = await newApplication.save();

    return {
      message: 'Application created successfully.',
      data: savedApplication.toObject(),
    };
  },

  updateApplicationStatus: async (
    id: string,
    status: string
  ): Promise<I_Application | null> => {
    return await ApplicationModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  },

  deleteApplication: async (id: string): Promise<I_Application | null> => {
    return await ApplicationModel.findByIdAndDelete(id).exec();
  },
};
