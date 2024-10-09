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

  applyForJob: async (
    jobId: string,
    applicant: { userId: string; cvUrl: string }
  ): Promise<{ message: string; data: I_Job | null }> => {
    const job = await JobModel.findById(jobId)

    if (!job) {
      return { message: 'Job not found', data: null }
    }

    const hasApplied = job.applicants?.some(
      (app) => app.userId.toString() === applicant.userId
    )

    if (hasApplied) {
      return { message: 'Bạn đã ứng tuyển công việc này', data: null }
    }

    const updatedJob = await JobModel.findByIdAndUpdate(
      jobId,
      { $push: { applicants: applicant } },
      { new: true }
    )

    if (updatedJob) {
      return { message: 'Ứng tuyển công việc thành công!', data: updatedJob }
    } else {
      return { message: 'Ứng tuyển công việc thất bại!', data: null }
    }
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
