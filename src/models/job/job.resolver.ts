import { jobController } from './job.controller'
import { I_Job } from './job.types'
import { LocationModel } from '../location/location.model'
import { CompanyModel } from '../company/company.model'
import { JobTypeModel } from '../job-type/job-type.model'
import mongoose from 'mongoose'
import { get } from 'http'

export const jobResolvers = {
  Query: {
    getAllJobs: async (): Promise<I_Job[]> => {
      return await jobController.getAllJobs()
    },
    getJob: async (_: any, { id }: { id: string }): Promise<I_Job | null> => {
      return await jobController.getJob(id)
    },
    getJobsByCompanyId: async (
      _: any,
      { companyId }: { companyId: string }
    ): Promise<I_Job[]> => {
      return await jobController.getJobsByCompanyId(companyId)
    },
    getJobsWithFilters: async (
      _: any,
      { Jtitle, Jlocation, JCategory }: { Jtitle: string; Jlocation: string; JCategory: string }
    ): Promise<I_Job[]> => {
      // Gọi controller để lấy kết quả
      return await jobController.getJobsWithFilters(Jtitle, Jlocation, JCategory);
  },
},
  Job: {
    jobType: async (parent: I_Job) => {
      return await JobTypeModel.findById(parent.jobTypeId)
    },
    location: async (parent: I_Job) => {
      return await LocationModel.findById(parent.locationId)
    },
    company: async (parent: I_Job) => {
      return await CompanyModel.findById(parent.companyId)
    },
  },
  Mutation: {
    createJob: async (
      _: any,
      {
        title,
        description,
        companyId,
        jobTypeId,
        categoryIds,
        locationId,
      }: {
        title: string
        description: string
        companyId: string
        jobTypeId: string
        categoryIds: string[]
        locationId: string
      }
    ): Promise<{ message: string; data: I_Job | null }> => {
      const objectIdCompanyId = new mongoose.Types.ObjectId(companyId)
      const objectIdJobTypeId = new mongoose.Types.ObjectId(jobTypeId)
      const objectIdCategoryIds = categoryIds.map(
        (id) => new mongoose.Types.ObjectId(id)
      )
      const objectIdLocationId = new mongoose.Types.ObjectId(locationId)

      return await jobController.createJob({
        title,
        description,
        companyId: objectIdCompanyId,
        jobTypeId: objectIdJobTypeId,
        categoryIds: objectIdCategoryIds,
        locationId: objectIdLocationId,
      })
    },
    updateJob: async (
      _: any,
      {
        id,
        title,
        description,
        companyId,
        jobTypeId,
        categoryIds,
        locationId,
      }: {
        id: string
        title?: string
        description?: string
        companyId?: string
        jobTypeId?: string
        categoryIds?: string[]
        locationId?: string
      }
    ): Promise<I_Job | null> => {
      const objectIdCompanyId = companyId
        ? new mongoose.Types.ObjectId(companyId)
        : undefined
      const objectIdJobTypeId = jobTypeId
        ? new mongoose.Types.ObjectId(jobTypeId)
        : undefined
      const objectIdCategoryIds = categoryIds
        ? categoryIds.map((id) => new mongoose.Types.ObjectId(id))
        : undefined
      const objectIdLocationId = locationId
        ? new mongoose.Types.ObjectId(locationId)
        : undefined

      return await jobController.updateJob(id, {
        title,
        description,
        companyId: objectIdCompanyId,
        jobTypeId: objectIdJobTypeId,
        categoryIds: objectIdCategoryIds,
        locationId: objectIdLocationId,
      })
    },
    deleteJob: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_Job | null> => {
      return await jobController.deleteJob(id)
    },
  },
}
