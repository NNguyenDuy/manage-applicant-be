import mongoose from 'mongoose';

// Tạo enum cho status
export enum E_ApplicationStatus {
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under review',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

// Cập nhật interface sử dụng enum cho status
export interface I_Application {
  jobId: mongoose.Types.ObjectId;
  candidateProfileId: mongoose.Types.ObjectId;
  status: E_ApplicationStatus; // Sử dụng enum thay vì chuỗi
  appliedAt: Date;
}
