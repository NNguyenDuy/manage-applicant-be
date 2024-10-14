import mongoose from 'mongoose'

export enum E_ApplicationStatus {
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface I_Application {
  jobId: mongoose.Types.ObjectId
  candidateProfileId: mongoose.Types.ObjectId
  selectedCvLink: string
  status: E_ApplicationStatus
  appliedAt: Date
  isDel?: boolean
}
