import { I_Job } from '../job'
import { jobController } from '../job/job.controller'
import { applicationController } from './application.controller'
import { E_ApplicationStatus, I_Application } from './application.types'

export const applicationResolvers = {
  Query: {
    getAllApplications: async (): Promise<I_Application[]> => {
      return await applicationController.getAllApplications()
    },
    getApplicationById: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_Application | null> => {
      return await applicationController.getApplicationById(id)
    },
    getApplicationByCandidate: async (
      _: any,
      {
        candidateProfileId,
        status,
        page = 1,
        limit = 5,
      }: {
        candidateProfileId: string
        status?: E_ApplicationStatus
        page: number
        limit: number
      }
    ): Promise<{
      items: I_Application[]
      totalItems: number
      totalPages: number
      currentPage: number
    }> => {
      return await applicationController.getApplicationByCandidate(
        candidateProfileId,
        status,
        page,
        limit
      )
    },
  },
  Application: {
    job: async (parent: I_Application): Promise<I_Job | null> => {
      if (!parent.jobId) return null
      return await jobController.getJobById(parent.jobId.toString())
    },
  },
  Mutation: {
    createApplication: async (
      _: any,
      { application }: { application: I_Application }
    ): Promise<I_Application | null> => {
      return await applicationController.createApplication(application)
    },
    updateApplication: async (
      _: any,
      { id, application }: { id: string; application: Partial<I_Application> }
    ): Promise<I_Application | null> => {
      return await applicationController.updateApplication(id, application)
    },
    deleteApplication: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_Application | null> => {
      return await applicationController.deleteApplication(id)
    },
  },
}
