import { Schema, model, Document } from 'mongoose';
import { I_Company } from './company.types';

export interface ICompanyDocument extends I_Company, Document { }

const CompanySchema = new Schema<ICompanyDocument>({
  name: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  locationId: { type: Schema.Types.ObjectId, ref: 'Location' },
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
});

export const CompanyModel = model<ICompanyDocument>('Company', CompanySchema);
