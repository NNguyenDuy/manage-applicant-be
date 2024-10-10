import { Schema, model, Document } from 'mongoose';
import { I_JobCategory } from './job-category.types';

export interface IJobCategoryDocument extends I_JobCategory, Document { }

const JobCategorySchema = new Schema<IJobCategoryDocument>({
  name: { type: String, required: true, unique: true },
});

export const JobCategoryModel = model<IJobCategoryDocument>('JobCategory', JobCategorySchema);
