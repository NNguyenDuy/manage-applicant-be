import { I_JobType } from './job-type.types'
import { JobTypeModel, IJobTypeDocument } from './job-type.model'

export const jobTypeController = {
  getAllJobTypes: async (): Promise<I_JobType[]> => {
    return await JobTypeModel.find()
  },

  getJobTypeById: async (id: string): Promise<IJobTypeDocument | null> => {
    return await JobTypeModel.findOne({ _id: id })
  },

  createJobType: async (type: I_JobType): Promise<IJobTypeDocument> => {
    const newType = new JobTypeModel(type)
    return await newType.save()
  },

  updateJobType: async (
    id: string,
    type: Partial<I_JobType>
  ): Promise<IJobTypeDocument | null> => {
    return await JobTypeModel.findByIdAndUpdate(id, type, { new: true })
  },

  deleteJobType: async (id: string): Promise<IJobTypeDocument | null> => {
    return await JobTypeModel.findByIdAndUpdate(
      id,
      { isDel: true },
      { new: true }
    )
  },
}
