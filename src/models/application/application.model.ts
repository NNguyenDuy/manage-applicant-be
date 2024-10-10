import { Schema, model, Document } from 'mongoose';
import { E_ApplicationStatus, I_Application } from './application.types';

export interface IApplicationDocument extends I_Application, Document { }

const ApplicationSchema = new Schema<IApplicationDocument>({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  candidateProfileId: { type: Schema.Types.ObjectId, ref: 'CandidateProfile', required: true },
  status: {
    type: String,
    enum: Object.values(E_ApplicationStatus), // Sử dụng giá trị từ enum E_ApplicationStatus
    default: E_ApplicationStatus.SUBMITTED // Mặc định là 'submitted'
  },
  appliedAt: { type: Date, default: Date.now },
});

export const ApplicationModel = model<IApplicationDocument>('Application', ApplicationSchema);
