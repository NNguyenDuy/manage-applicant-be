import { ObjectId } from 'mongoose'

export interface I_Job {
  title: string
  description: string
  salary: number
  position: string
  recruiterId: ObjectId
  applicants: ObjectId[]
}
