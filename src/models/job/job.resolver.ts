import { jobController } from './job.controller'
import { I_Job } from './job.types'

export const jobResolvers = {
  Query: {
    getAllJobs: async (): Promise<I_Job[]> => {
      return await jobController.getAllJobs()
    },
    getJobById: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_Job | null> => {
      return await jobController.getJobById(id)
    },
    getAllJobsByRecruiterId: async (
      _: any,
      { recruiterId }: { recruiterId: string }
    ): Promise<I_Job[]> => {
      return await jobController.getAllJobsByRecruiterId(recruiterId)
    },
  },
  Mutation: {
    createJob: async (
      _: any,
      {
        title,
        description,
        salary,
        position,
        recruiterId,
        applicants,
      }: {
        title: string
        description: string
        salary: number
        position: string
        recruiterId: string
        applicants?: { userId: string; cvUrl: string }[]
      }
    ): Promise<{ message: string; data: I_Job }> => {
      return await jobController.createJob(
        title,
        description,
        salary,
        position,
        recruiterId,
        applicants
      )
    },
    updateJob: async (
      _: any,
      {
        id,
        title,
        description,
        salary,
        position,
        applicants,
      }: {
        id: string
        title?: string
        description?: string
        salary?: number
        position?: string
        applicants?: { userId: string; cvUrl: string }[]
      }
    ): Promise<I_Job | null> => {
      return await jobController.updateJob(
        id,
        title,
        description,
        salary,
        position,
        applicants
      )
    },
    deleteJob: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_Job | null> => {
      return await jobController.deleteJob(id)
    },
  },
}
