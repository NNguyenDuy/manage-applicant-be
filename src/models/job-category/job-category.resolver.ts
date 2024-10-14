import { jobCategoryController } from './job-category.controller'
import { I_JobCategory } from './job-category.types'

export const jobCategoryResolvers = {
  Query: {
    getAllJobCategories: async (): Promise<I_JobCategory[]> => {
      return await jobCategoryController.getAllJobCategories()
    },
    getJobCategoryById: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_JobCategory | null> => {
      return await jobCategoryController.getJobCategoryById(id)
    },
  },
  Mutation: {
    createJobCategory: async (
      _: any,
      { category }: { category: I_JobCategory }
    ): Promise<I_JobCategory> => {
      return await jobCategoryController.createJobCategory(category)
    },
    updateJobCategory: async (
      _: any,
      { id, category }: { id: string; category: Partial<I_JobCategory> }
    ): Promise<I_JobCategory | null> => {
      return await jobCategoryController.updateJobCategory(id, category)
    },
    deleteJobCategory: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_JobCategory | null> => {
      return await jobCategoryController.deleteJobCategory(id)
    },
  },
}
