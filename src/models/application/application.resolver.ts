import { applicationController } from './application.controller'
import { I_Application } from './application.types'

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
    deleteApplication: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_Application | null> => {
      return await applicationController.deleteApplication(id)
    },
  },
}
