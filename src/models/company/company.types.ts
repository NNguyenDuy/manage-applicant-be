import mongoose from 'mongoose'

export interface I_Company {
  name: string
  description?: string
  size?: number
  field?: string
  locationId?: mongoose.Types.ObjectId
  isDel?: boolean
}
