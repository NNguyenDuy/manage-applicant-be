import { I_Job } from './job.types'
import mongoose, { Schema } from 'mongoose'

const JobSchema = new Schema<I_Job>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number, required: true },
  location: { type: String, required: true },
  recruiterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  applicants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

export const JobModel = mongoose.model<I_Job>('Job', JobSchema)
