import mongoose from 'mongoose'
import { JobCategoryModel, IJobCategoryDocument } from '../job-category'
import { LocationModel } from '../location'
import { IJobDocument, JobModel } from './job.model'
import { get } from 'http'

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
  getJobsWithFilters: async (
    Jtitle: string,
    Jlocation: string,
    JCategory: string,
    isDel: boolean
  ): Promise<IJobDocument[]> => {
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
      const foundJobCategory = (await JobCategoryModel.findOne({
        name: JCategory,
      })) as IJobCategoryDocument | null
      if (
        foundJobCategory &&
        mongoose.Types.ObjectId.isValid(foundJobCategory.name)
      ) {
        query.categoryId = foundJobCategory._id
      }
    }
    query.isDel = isDel

    return await JobModel.find(query)
  },
  getMaintainJobsByCompany: async (
    companyId: string
  ): Promise<IJobDocument[]> => {
    return await JobModel.find({ companyId, isDel: false })
  },
  updateJob: async (
    jobId: string,
    jobData: Partial<IJobDocument>
  ): Promise<IJobDocument | null> => {
    return await JobModel.findOneAndUpdate({ _id: jobId }, jobData, {
      new: true,
    })
  },
  updateIsDel: async (
    jobId: string,
    isDel: boolean
  ): Promise<IJobDocument | null> => {
    return await JobModel.findOneAndUpdate(
      { _id: jobId },
      { isDel: isDel },
      { new: true }
    )
  },

  deleteJob: async (jobId: string): Promise<void> => {
    await JobModel.updateOne({ _id: jobId }, { isDel: true })
  },
}
