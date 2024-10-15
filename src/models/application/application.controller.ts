import { E_ApplicationStatus, I_Application } from './application.types'
import { ApplicationModel, IApplicationDocument } from './application.model'

export const applicationController = {
  getAllApplications: async (): Promise<I_Application[]> => {
    return await ApplicationModel.find({ isDel: false })
  },

  getApplicationByCandidate: async (
    candidateProfileId: string,
    status?: E_ApplicationStatus,
    page: number = 1,
    limit: number = 5
  ): Promise<{
    items: IApplicationDocument[]
    totalItems: number
    totalPages: number
    currentPage: number
  }> => {
    const query: any = {
      candidateProfileId,
      isDel: false,
    }
    if (status) {
      query.status = status
    }

    const offset = (page - 1) * limit

    const totalItems = await ApplicationModel.countDocuments(query)

    const items = await ApplicationModel.find(query).skip(offset).limit(limit)

    const totalPages = Math.ceil(totalItems / limit)

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
    }
  },

  getApplicationById: async (
    id: string
  ): Promise<IApplicationDocument | null> => {
    return await ApplicationModel.findOne({ _id: id, isDel: false })
  },

  createApplication: async (
    application: I_Application
  ): Promise<IApplicationDocument | null> => {
    const job = await ApplicationModel.findOne({ jobId: application.jobId })
    const candidateProfile = await ApplicationModel.findOne({
      candidateProfileId: application.candidateProfileId,
    })
    if (job && candidateProfile) return null
    return await new ApplicationModel(application).save()
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
