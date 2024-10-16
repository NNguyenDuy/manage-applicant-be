import { I_Job } from '../job'
import { jobController } from '../job/job.controller'
import { applicationController } from './application.controller'
import { I_Application } from './application.types'
import { E_ApplicationStatus } from './application.types'
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
      { candidateProfileId }: { candidateProfileId: string }
    ): Promise<I_Application[] | null> => {
      return await applicationController.getApplicationByCandidate(
        candidateProfileId
      )
    },
    getApplicationsByJob: async (_: any, { jobId }: { jobId: string }): Promise<I_Application[]> => {
      const applications = await applicationController.getApplicationsByJob(jobId);
      return applications ?? [];
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
    ): Promise<I_Application> => {
      return await applicationController.createApplication(application)
    },
    updateApplication: async (
      _: any,
      { id, application }: { id: string; application: Partial<I_Application> }
    ): Promise<I_Application | null> => {
      return await applicationController.updateApplication(id, application)
    },
    updateApplicationStatus: async (
      _: any,
      { id, newStatus }: { id: string; newStatus: E_ApplicationStatus }
    ): Promise<I_Application | null> => {
      return await applicationController.updateApplicationStatus(id, newStatus);
    },
    deleteApplication: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_Application | null> => {
      return await applicationController.deleteApplication(id)
    },
  },
}
