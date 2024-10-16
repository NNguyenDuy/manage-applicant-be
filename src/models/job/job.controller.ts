import mongoose from 'mongoose'
import { JobCategoryModel, IJobCategoryDocument } from '../job-category'
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

  getAllJobs: async (idDel: boolean): Promise<IJobDocument[]> => {
    return await JobModel.find({ idDel }); 
  },
  getJobsWithFilters: async (Jtitle: string, Jlocation: string, JCategory: string, idDel: boolean): Promise<IJobDocument[]> => {
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
      const foundJobCategory = await JobCategoryModel.findOne({ name: JCategory }) as IJobCategoryDocument | null;
      if (foundJobCategory && mongoose.Types.ObjectId.isValid(foundJobCategory.name)) {
        query.categoryId = foundJobCategory._id;
      }
    }
    query.idDel = idDel;
    
    return await JobModel.find(query)
  },
  updateJob: async (
    jobId: string,
    jobData: Partial<IJobDocument>
  ): Promise<IJobDocument | null> => {
    return await JobModel.findOneAndUpdate({ _id: jobId }, jobData, {
      new: true,
    })
  },
  updateIsDel: async (jobId: string, isDel: boolean): Promise<IJobDocument | null> => {
    return await JobModel.findOneAndUpdate(
      { _id: jobId },
      { idDel: isDel },  
      { new: true }
    );
  },
  
  
  deleteJob: async (jobId: string): Promise<void> => {
    await JobModel.updateOne({ _id: jobId }, { idDel: true })
  },
}
