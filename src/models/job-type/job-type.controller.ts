import { I_JobType } from './job-type.types';
import { JobTypeModel } from './job-type.model';

export const jobTypeController = {
  getAllJobTypes: async (): Promise<I_JobType[]> => {
    return await JobTypeModel.find().exec();
  },

  getJobType: async (id: string): Promise<I_JobType | null> => {
    return await JobTypeModel.findById(id).exec();
  },

  createJobType: async (
    jobType: I_JobType
  ): Promise<{ message: string; data: I_JobType | null }> => {
    const newJobType = new JobTypeModel(jobType);
    const savedJobType = await newJobType.save();

    return {
      message: 'Job type created successfully.',
      data: savedJobType.toObject(),
    };
  },

  updateJobType: async (
    id: string,
    type: string
  ): Promise<I_JobType | null> => {
    return await JobTypeModel.findByIdAndUpdate(id, { type }, { new: true }).exec();
  },

  deleteJobType: async (id: string): Promise<I_JobType | null> => {
    return await JobTypeModel.findByIdAndDelete(id).exec();
  },
};
