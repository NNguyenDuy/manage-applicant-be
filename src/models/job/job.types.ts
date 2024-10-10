import mongoose from 'mongoose';

export interface I_Job {
  title: string;
  description: string;
  companyId: mongoose.Types.ObjectId;
  jobTypeId: mongoose.Types.ObjectId;
  categoryIds: mongoose.Types.ObjectId[];
  locationId: mongoose.Types.ObjectId;
  candidates?: mongoose.Types.ObjectId[];
}
