import { JobCategoryModel } from '../job-category'
import { LocationModel } from '../location'
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
  getJobsWithFilters: async (Jtitle: string, Jlocation: string, JCategory: string): Promise<IJobDocument[]> => {
    const query: any = {}
    
    if (Jtitle) {
      query.title = { $regex: Jtitle, $options: 'i' }
    }
    
    if (Jlocation) {
      const foundLocation = await LocationModel.findOne({ city: Jlocation })
      if (foundLocation) {
        query.locationId = foundLocation._id
      }
    }
    
    if (JCategory) {
      const foundJobType = await JobCategoryModel.findOne({ name: JCategory })
      if (foundJobType) {
        query.categoryIds = foundJobType._id
      }
    }
    
    return await JobModel.find(query)
      .populate('companyId')
      .populate('jobTypeId')
      .populate('categoryIds')
      .populate('locationId')
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
}
