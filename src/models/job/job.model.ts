import { Schema, model, Document } from 'mongoose'
import { I_Job } from './job.types'

export interface IJobDocument extends I_Job, Document {}

const JobSchema = new Schema<IJobDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number, required: true },
  experience: { type: Number, required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  headcount: { type: Number, required: true },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  jobTypeId: { type: Schema.Types.ObjectId, ref: 'JobType', required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'JobCategory' },
  locationId: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  isDel: { type: Boolean, default: false },
})

export const JobModel = model<IJobDocument>('Job', JobSchema)
