import { I_Application } from './application.types'
import { ApplicationModel, IApplicationDocument } from './application.model'

export const applicationController = {
  getAllApplications: async (): Promise<I_Application[]> => {
    return await ApplicationModel.find({ isDel: false })
  },

  getApplicationByCandidate: async (
    candidateProfileId: string
  ): Promise<IApplicationDocument[] | null> => {
    return await ApplicationModel.find({ candidateProfileId, isDel: false })
  },

  getApplicationById: async (
    id: string
  ): Promise<IApplicationDocument | null> => {
    return await ApplicationModel.findOne({ _id: id, isDel: false })
  },

  createApplication: async (
    application: I_Application
  ): Promise<IApplicationDocument> => {
    const newApplication = new ApplicationModel(application)
    return await newApplication.save()
  },

  updateApplication: async (
    id: string,
    application: Partial<I_Application>
  ): Promise<IApplicationDocument | null> => {
    return await ApplicationModel.findByIdAndUpdate(id, application, {
      new: true,
    })
  },

  deleteApplication: async (
    id: string
  ): Promise<IApplicationDocument | null> => {
    return await ApplicationModel.findByIdAndUpdate(
      id,
      { isDel: true },
      { new: true }
    )
  },
}
