import mongoose from 'mongoose'

export interface I_Job {
  title: string
  description: string
  salary: number
  experience: number
  deadline: Date
  createdAt: Date
  updatedAt: Date
  headcount: number
  companyId: mongoose.Types.ObjectId
  jobTypeId: mongoose.Types.ObjectId
  categoryId?: mongoose.Types.ObjectId
  locationId: mongoose.Types.ObjectId
  idDel?: boolean 
}
