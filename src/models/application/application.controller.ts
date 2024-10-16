import { I_Application } from './application.types'
import { ApplicationModel, IApplicationDocument } from './application.model'
import { E_ApplicationStatus } from './application.types';
import { JobModel } from '../job/job.model';
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
  getApplicationsByCompany: async (
    companyId: string
  ): Promise<IApplicationDocument[] | null> => {
    const jobs = await JobModel.find({ companyId, idDel: false }, '_id');
    const jobIds = jobs.map((job) => job._id); 
    return await ApplicationModel.find({ jobId: { $in: jobIds }, isDel: false });
  },
  createApplication: async (
    application: I_Application
  ): Promise<IApplicationDocument> => {
    const newApplication = new ApplicationModel(application)
    return await newApplication.save()
  },
  updateApplicationStatus: async (
    applicationId: string,
    newStatus: E_ApplicationStatus
  ): Promise<IApplicationDocument | null> => {
    return await ApplicationModel.findOneAndUpdate(
      { _id: applicationId },               
      { status: newStatus },                
      { new: true }                        
    );
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
