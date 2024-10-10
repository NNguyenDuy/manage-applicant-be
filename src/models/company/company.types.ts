import mongoose from 'mongoose';

export interface I_Company {
  name: string;
  ownerId: mongoose.Types.ObjectId;
  locationId?: mongoose.Types.ObjectId;
  jobs?: mongoose.Types.ObjectId[];
}
