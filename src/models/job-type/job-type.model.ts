import { Schema, model, Document } from 'mongoose';
import { I_JobType } from './job-type.types';

export interface IJobTypeDocument extends I_JobType, Document { }

const JobTypeSchema = new Schema<IJobTypeDocument>({
  type: { type: String, required: true, unique: true },
});

export const JobTypeModel = model<IJobTypeDocument>('JobType', JobTypeSchema);
