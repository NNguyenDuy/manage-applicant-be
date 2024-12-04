import { I_JobCategory } from './job-category.types'
import { JobCategoryModel, IJobCategoryDocument } from './job-category.model'

export const jobCategoryController = {
  getAllJobCategories: async (): Promise<I_JobCategory[]> => {
    return await JobCategoryModel.find()
  },

  getJobCategoryById: async (
    id: string
  ): Promise<IJobCategoryDocument | null> => {
    return await JobCategoryModel.findOne({ _id: id })
  },

  createJobCategory: async (
    category: I_JobCategory
  ): Promise<IJobCategoryDocument> => {
    const newCategory = new JobCategoryModel(category)
    return await newCategory.save()
  },

  updateJobCategory: async (
    id: string,
    category: Partial<I_JobCategory>
  ): Promise<IJobCategoryDocument | null> => {
    return await JobCategoryModel.findByIdAndUpdate(id, category, { new: true })
  },

  deleteJobCategory: async (
    id: string
  ): Promise<IJobCategoryDocument | null> => {
    return await JobCategoryModel.findByIdAndUpdate(
      id,
      { isDel: true },
      { new: true }
    )
  },
}
