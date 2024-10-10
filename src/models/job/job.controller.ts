import { I_Job } from './job.types';
import { JobModel } from './job.model';

export const jobController = {
  getAllJobs: async (): Promise<I_Job[]> => {
    return await JobModel.find()
      .populate('companyId jobTypeId categoryIds locationId candidates') // Populate JobType, Location, Company
      .exec();
  },

  getJob: async (id: string): Promise<I_Job | null> => {
    return await JobModel.findById(id)
      .populate('companyId jobTypeId categoryIds locationId candidates') // Populate JobType, Location, Company
      .exec();
  },

  createJob: async (
    job: I_Job
  ): Promise<{ message: string; data: I_Job | null }> => {
    const newJob = new JobModel(job);
    const savedJob = await newJob.save();
    return {
      message: 'Job created successfully.',
      data: savedJob.toObject(),
    };
  },

  updateJob: async (id: string, jobData: Partial<I_Job>): Promise<I_Job | null> => {
    return await JobModel.findByIdAndUpdate(id, jobData, { new: true }).exec();
  },

  deleteJob: async (id: string): Promise<I_Job | null> => {
    return await JobModel.findByIdAndDelete(id).exec();
  },
};
