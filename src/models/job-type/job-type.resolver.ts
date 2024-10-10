import { jobTypeController } from './job-type.controller';
import { I_JobType } from './job-type.types';

export const jobTypeResolvers = {
  Query: {
    getAllJobTypes: async (): Promise<I_JobType[]> => {
      return await jobTypeController.getAllJobTypes();
    },
    getJobType: async (_: any, { id }: { id: string }): Promise<I_JobType | null> => {
      return await jobTypeController.getJobType(id);
    },
  },
  Mutation: {
    createJobType: async (
      _: any,
      { type }: { type: string }
    ): Promise<{ message: string; data: I_JobType | null }> => {
      return await jobTypeController.createJobType({ type });
    },
    updateJobType: async (
      _: any,
      { id, type }: { id: string; type: string }
    ): Promise<I_JobType | null> => {
      return await jobTypeController.updateJobType(id, type);
    },
    deleteJobType: async (_: any, { id }: { id: string }): Promise<I_JobType | null> => {
      return await jobTypeController.deleteJobType(id);
    },
  },
};
