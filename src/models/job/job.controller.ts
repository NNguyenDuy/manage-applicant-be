import { IJobDocument, JobModel } from './job.model'

export const jobController = {
  createJob: async (jobData: IJobDocument): Promise<IJobDocument> => {
    const job = new JobModel(jobData)
    return await job.save()
  },

  getJobById: async (jobId: string): Promise<IJobDocument | null> => {
    return await JobModel.findOne({ _id: jobId })
  },

  getAllJobs: async (): Promise<IJobDocument[]> => {
    return await JobModel.find()
  },

  updateJob: async (
    jobId: string,
    jobData: Partial<IJobDocument>
  ): Promise<IJobDocument | null> => {
    return await JobModel.findOneAndUpdate({ _id: jobId }, jobData, {
      new: true,
    })
  },

  deleteJob: async (jobId: string): Promise<void> => {
    await JobModel.updateOne({ _id: jobId }, { idDel: true })
  },

  getMaintainJobsByCompany: async (companyId: string): Promise<IJobDocument[]> => {
    return await JobModel.find({ companyId, idDel: false })
  },
}
