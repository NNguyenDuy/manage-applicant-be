import { I_Job } from './job.types'
import mongoose, { Schema } from 'mongoose'

const JobSchema = new Schema<I_Job>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number, required: true },
  position: { type: String, required: true },
  recruiterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  applicants: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      cvUrl: { type: String, required: true },
    },
  ],
})

export const JobModel = mongoose.model<I_Job>('Job', JobSchema)
