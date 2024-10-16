import { I_Company } from '../company'
import { companyController } from '../company/company.controller'
import { I_JobCategory } from '../job-category'
import { jobCategoryController } from '../job-category/job-category.controller'
import { I_JobType } from '../job-type'
import { jobTypeController } from '../job-type/job-type.controller'
import { I_Location } from '../location'
import { locationController } from '../location/location.controller'
import { jobController } from './job.controller'
import { IJobDocument } from './job.model'
import { I_Job } from './job.types'

export const jobResolvers = {
  Query: {
    getJobById: async (
      _: any,
      { jobId }: { jobId: string }
    ): Promise<IJobDocument | null> => {
      return await jobController.getJobById(jobId)
    },
    getAllJobs: async (_: any, { idDel }: { idDel: boolean }): Promise<IJobDocument[]> => { 
      return await jobController.getAllJobs(idDel);
    },
    getJobsWithFilters: async (
      _: any,
      { Jtitle, Jlocation, JCategory, idDel }: { Jtitle: string; Jlocation: string; JCategory: string; idDel: boolean }
    ): Promise<IJobDocument[]> => {
      return await jobController.getJobsWithFilters(Jtitle, Jlocation, JCategory, idDel);
    },   
    getMaintainJobsByCompany: async (
      _: any,
      { companyId }: { companyId: string }
    ): Promise<IJobDocument[]> => {
      return await jobController.getMaintainJobsByCompany(companyId)
    }, 
  },
  Job: {
    location: async (parent: I_Job): Promise<I_Location | null> => {
      if (!parent.locationId) return null
      return await locationController.getLocationById(
        parent.locationId.toString()
      )
    },
    company: async (parent: I_Job): Promise<I_Company | null> => {
      if (!parent.companyId) return null
      return await companyController.getCompanyById(parent.companyId.toString())
    },
    jobType: async (parent: I_Job): Promise<I_JobType | null> => {
      if (!parent.jobTypeId) return null
      return await jobTypeController.getJobTypeById(parent.jobTypeId.toString())
    },
    category: async (parent: I_Job): Promise<I_JobCategory | null> => {
      if (!parent.categoryId) return null
      return await jobCategoryController.getJobCategoryById(
        parent.categoryId.toString()
      )
    },
  },
  Mutation: {
    createJob: async (
      _: any,
      { jobData }: { jobData: IJobDocument }
    ): Promise<IJobDocument> => {
      return await jobController.createJob(jobData)
    },
    updateJob: async (
      _: any,
      { jobId, jobData }: { jobId: string; jobData: Partial<IJobDocument> }
    ): Promise<IJobDocument | null> => {
      return await jobController.updateJob(jobId, jobData)
    },
    updateIsDel: async (
      _: any,
      { jobId, isDel }: { jobId: string; isDel: boolean }
    ): Promise<IJobDocument | null> => {
      return await jobController.updateIsDel(jobId, isDel);
    },
    deleteJob: async (_: any, { jobId }: { jobId: string }): Promise<void> => {
      await jobController.deleteJob(jobId)
    },
  },
}
