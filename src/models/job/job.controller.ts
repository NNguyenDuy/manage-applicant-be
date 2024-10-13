import { I_Job } from './job.types'
import { JobModel } from './job.model'
import { LocationModel } from '../location/location.model'
import { JobTypeModel } from '../job-type/job-type.model'
import { JobCategoryModel } from '../job-category'
export const jobController = {
  getAllJobs: async (): Promise<I_Job[]> => {
    return await JobModel.find().populate(
      'companyId jobTypeId categoryIds locationId candidates'
    )
  },
  getJobsWithFilters: async (Jtitle: string, Jlocation: string, JCategory: string): Promise<I_Job[]> => {
    const query: any = {};
  
    // Sử dụng $regex để tìm kiếm tiêu đề có chứa chuỗi title
    if (Jtitle) {
      query.title = { $regex: Jtitle, $options: 'i' }; // 'i' để không phân biệt chữ hoa/chữ thường
    }
  
    if (Jlocation) {
      const foundLocation = await LocationModel.findOne({ city: Jlocation });
      if (foundLocation) {
        query.locationId = foundLocation._id;
      }
    }
  
    if (JCategory) {
      const foundJobType = await JobCategoryModel.findOne({ name: JCategory });
      if (foundJobType) {
        query.categoryIds = foundJobType._id;
      }
    }
  
    return await JobModel.find(query)
      .populate('companyId')
      .populate('jobTypeId')
      .populate('categoryIds')
      .populate('locationId');
  },
  
  getJob: async (id: string): Promise<I_Job | null> => {
    return await JobModel.findById(id).populate('companyId jobTypeId categoryIds locationId');
  },
  getJobsByCompanyId: async (companyId: string): Promise<I_Job[]> => {
    return await JobModel.find({ companyId }).populate(
      'companyId jobTypeId categoryIds locationId candidates'
    )
  },

  createJob: async (
    job: I_Job
  ): Promise<{ message: string; data: I_Job | null }> => {
    const newJob = new JobModel(job)
    const savedJob = await newJob.save()
    return {
      message: 'Job created successfully.',
      data: savedJob.toObject(),
    }
  },

  updateJob: async (
    id: string,
    jobData: Partial<I_Job>
  ): Promise<I_Job | null> => {
    return await JobModel.findByIdAndUpdate(id, jobData, { new: true }).exec()
  },

  deleteJob: async (id: string): Promise<I_Job | null> => {
    return await JobModel.findByIdAndDelete(id).exec()
  },
}
