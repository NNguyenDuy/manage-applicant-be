import { jobCategoryController } from './job-category.controller';
import { I_JobCategory } from './job-category.types';

export const jobCategoryResolvers = {
  Query: {
    getAllJobCategories: async (): Promise<I_JobCategory[]> => {
      return await jobCategoryController.getAllJobCategories();
    },
    getJobCategory: async (_: any, { id }: { id: string }): Promise<I_JobCategory | null> => {
      return await jobCategoryController.getJobCategory(id);
    },
  },
  Mutation: {
    createJobCategory: async (_: any, { name }: { name: string }): Promise<{ message: string; data: I_JobCategory | null }> => {
      return await jobCategoryController.createJobCategory({ name });
    },
    updateJobCategory: async (_: any, { id, name }: { id: string; name: string }): Promise<I_JobCategory | null> => {
      return await jobCategoryController.updateJobCategory(id, name);
    },
    deleteJobCategory: async (_: any, { id }: { id: string }): Promise<I_JobCategory | null> => {
      return await jobCategoryController.deleteJobCategory(id);
    },
  },
};
