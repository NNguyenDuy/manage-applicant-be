import { Schema, model, Document } from 'mongoose'
import { I_Company } from './company.types'

export interface ICompanyDocument extends I_Company, Document {}

const CompanySchema = new Schema<ICompanyDocument>({
  name: { type: String, required: true },
  description: { type: String },
  size: { type: Number },
  field: { type: String },
  locationId: { type: Schema.Types.ObjectId, ref: 'Location' },
  idDel: { type: Boolean, default: false },
})

export const CompanyModel = model<ICompanyDocument>('Company', CompanySchema)
