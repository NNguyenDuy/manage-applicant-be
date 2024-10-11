import mongoose from 'mongoose';

export enum E_ApplicationStatus {
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under review',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface I_Application {
  jobId: mongoose.Types.ObjectId;
  candidateProfileId: mongoose.Types.ObjectId;
  status: E_ApplicationStatus;
  appliedAt: Date;
}
