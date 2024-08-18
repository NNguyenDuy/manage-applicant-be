import { ObjectId } from 'mongoose'

export interface I_Job {
  title: string
  description: string
  salary: number
  location: string
  recruiterId: ObjectId
  companyId: ObjectId
  applicants: ObjectId[]
}
