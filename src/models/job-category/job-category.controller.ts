import { I_JobCategory } from './job-category.types';
import { JobCategoryModel } from './job-category.model';

export const jobCategoryController = {
  getAllJobCategories: async (): Promise<I_JobCategory[]> => {
    return await JobCategoryModel.find().exec();
  },

  getJobCategory: async (id: string): Promise<I_JobCategory | null> => {
    return await JobCategoryModel.findById(id).exec();
  },

  createJobCategory: async (category: I_JobCategory): Promise<{ message: string; data: I_JobCategory | null }> => {
    const newCategory = new JobCategoryModel(category);
    const savedCategory = await newCategory.save();
    return {
      message: 'Job category created successfully.',
      data: savedCategory.toObject(),
    };
  },

  updateJobCategory: async (id: string, name: string): Promise<I_JobCategory | null> => {
    return await JobCategoryModel.findByIdAndUpdate(id, { name }, { new: true }).exec();
  },

  deleteJobCategory: async (id: string): Promise<I_JobCategory | null> => {
    return await JobCategoryModel.findByIdAndDelete(id).exec();
  },
};
