import { I_Company } from './company.types'
import mongoose, { Schema } from 'mongoose'

const CompanySchema = new Schema<I_Company>({
  name: { type: String, required: true },
  address: { type: String },
  description: { type: String },
})

export const CompanyModel = mongoose.model<I_Company>('Company', CompanySchema)
