import { Schema, model, Document } from 'mongoose';
import { I_Job } from './job.types';

export interface IJobDocument extends I_Job, Document { }

const JobSchema = new Schema<IJobDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  jobTypeId: { type: Schema.Types.ObjectId, ref: 'JobType', required: true },
  categoryIds: [{ type: Schema.Types.ObjectId, ref: 'JobCategory' }],
  locationId: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  candidates: [{ type: Schema.Types.ObjectId, ref: 'CandidateProfile' }],
});

export const JobModel = model<IJobDocument>('Job', JobSchema);
