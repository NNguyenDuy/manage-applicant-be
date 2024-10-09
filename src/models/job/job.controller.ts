import { I_Job } from './job.types'
import { JobModel } from './job.model'

export const jobController = {
  getAllJobs: async (): Promise<I_Job[]> => {
    return await JobModel.find()
  },

  getJobById: async (id: string): Promise<I_Job | null> => {
    return await JobModel.findById(id)
  },

  getAllJobsByRecruiterId: async (recruiterId: string): Promise<I_Job[]> => {
    return await JobModel.find({ recruiterId })
  },

  createJob: async (
    title: string,
    description: string,
    salary: number,
    position: string,
    recruiterId: string,
    applicants?: { userId: string; cvUrl: string }[]
  ): Promise<{ message: string; data: I_Job }> => {
    const newJob = new JobModel({
      title,
      description,
      salary,
      position,
      recruiterId,
      applicants,
    })
    const savedJob = await newJob.save()
    return {
      message: 'Job created successfully.',
      data: savedJob.toObject(),
    }
  },

  updateJob: async (
    id: string,
    title?: string,
    description?: string,
    salary?: number,
    position?: string,
    applicants?: { userId: string; cvUrl: string }[]
  ): Promise<I_Job | null> => {
    return await JobModel.findByIdAndUpdate(
      id,
      { title, description, salary, position, applicants },
      { new: true }
    )
  },

  deleteJob: async (id: string): Promise<I_Job | null> => {
    return await JobModel.findByIdAndDelete(id)
  },
}
