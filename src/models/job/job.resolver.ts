import { jobController } from './job.controller';
import { I_Job } from './job.types';
import { LocationModel } from '../location/location.model';
import { CompanyModel } from '../company/company.model';
import { JobTypeModel } from '../job-type/job-type.model';
import mongoose from 'mongoose';

export const jobResolvers = {
  Query: {
    getAllJobs: async (): Promise<I_Job[]> => {
      return await jobController.getAllJobs();
    },
    getJob: async (_: any, { id }: { id: string }): Promise<I_Job | null> => {
      return await jobController.getJob(id);
    },
  },
  Job: {
    jobType: async (parent: I_Job) => {
      return await JobTypeModel.findById(parent.jobTypeId); // Populate JobType
    },
    location: async (parent: I_Job) => {
      return await LocationModel.findById(parent.locationId); // Populate Location
    },
    company: async (parent: I_Job) => {
      return await CompanyModel.findById(parent.companyId); // Populate Company
    }
  },
  Mutation: {
    createJob: async (
      _: any,
      { title, description, companyId, jobTypeId, categoryIds, locationId }:
        { title: string; description: string; companyId: string; jobTypeId: string; categoryIds: string[]; locationId: string }
    ): Promise<{ message: string; data: I_Job | null }> => {
      const objectIdCompanyId = new mongoose.Types.ObjectId(companyId);
      const objectIdJobTypeId = new mongoose.Types.ObjectId(jobTypeId);
      const objectIdCategoryIds = categoryIds.map(id => new mongoose.Types.ObjectId(id));
      const objectIdLocationId = new mongoose.Types.ObjectId(locationId);

      return await jobController.createJob({
        title,
        description,
        companyId: objectIdCompanyId,
        jobTypeId: objectIdJobTypeId,
        categoryIds: objectIdCategoryIds,
        locationId: objectIdLocationId,
      });
    },
    updateJob: async (
      _: any,
      { id, title, description, companyId, jobTypeId, categoryIds, locationId }:
        { id: string; title?: string; description?: string; companyId?: string; jobTypeId?: string; categoryIds?: string[]; locationId?: string }
    ): Promise<I_Job | null> => {
      const objectIdCompanyId = companyId ? new mongoose.Types.ObjectId(companyId) : undefined;
      const objectIdJobTypeId = jobTypeId ? new mongoose.Types.ObjectId(jobTypeId) : undefined;
      const objectIdCategoryIds = categoryIds ? categoryIds.map(id => new mongoose.Types.ObjectId(id)) : undefined;
      const objectIdLocationId = locationId ? new mongoose.Types.ObjectId(locationId) : undefined;

      return await jobController.updateJob(id, {
        title,
        description,
        companyId: objectIdCompanyId,
        jobTypeId: objectIdJobTypeId,
        categoryIds: objectIdCategoryIds,
        locationId: objectIdLocationId,
      });
    },
    deleteJob: async (_: any, { id }: { id: string }): Promise<I_Job | null> => {
      return await jobController.deleteJob(id);
    },
  },
};
