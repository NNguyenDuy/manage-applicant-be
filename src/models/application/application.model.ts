import { Schema, model, Document } from 'mongoose'
import { I_Application, E_ApplicationStatus } from './application.types'

export interface IApplicationDocument extends I_Application, Document {}

const ApplicationSchema = new Schema<IApplicationDocument>({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  candidateProfileId: {
    type: Schema.Types.ObjectId,
    ref: 'CandidateProfile',
    required: true,
  },
  selectedCvLink: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(E_ApplicationStatus),
    default: E_ApplicationStatus.SUBMITTED,
  },
  appliedAt: { type: Date, default: Date.now },
  isDel: { type: Boolean, default: false },
})

export const ApplicationModel = model<IApplicationDocument>(
  'Application',
  ApplicationSchema
)
