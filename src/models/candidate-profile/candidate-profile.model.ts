import { Schema, model, Document } from 'mongoose';
import { I_CandidateProfile } from './candidate-profile.types';

export interface ICandidateProfileDocument extends I_CandidateProfile, Document { }

const CandidateProfileSchema = new Schema<ICandidateProfileDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  resume: {
    cvLinks: [{ type: String }],
    skills: [{ name: String, experience: Number }],
  },
  applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }],
});

export const CandidateProfileModel = model<ICandidateProfileDocument>('CandidateProfile', CandidateProfileSchema);
