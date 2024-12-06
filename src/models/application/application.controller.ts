import {
  E_ApplicationStatus,
  E_EvaluationAI,
  I_Application,
} from './application.types'
import { ApplicationModel, IApplicationDocument } from './application.model'
import { evaluateCV } from '../AI/evaluate-cv'
import { JobModel } from '../job'
import pdf from 'pdf-parse'
import fs from 'fs/promises'
import path from 'path'
import { sendApprovalEmail } from './../../shared/constants/emailService';
import { CandidateProfileModel } from '../candidate-profile/candidate-profile.model'
import { UserModel } from '../user'

async function pdfToText(fileCV: string): Promise<string> {
  try {
    const cvFile = path.join(__dirname, '../../', 'public', fileCV)
    const dataBuffer = await fs.readFile(cvFile)
    const data = await pdf(dataBuffer)
    return data.text
  } catch (error) {
    console.error(`Lỗi khi đọc PDF ${fileCV}: ${(error as Error).message}`)
    throw error
  }
}

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
  getApplicationsByJob: async (
    jobId: string
  ): Promise<IApplicationDocument[] | []> => {
    const applications = await ApplicationModel.find({ jobId, isDel: false })
    if (!applications || applications.length === 0) {
      return []
    }

    return applications
  },

  createApplication: async (
    application: I_Application
  ): Promise<IApplicationDocument | null> => {
    const existingApplication = await ApplicationModel.findOne({
      jobId: application.jobId,
      candidateProfileId: application.candidateProfileId,
    })

    if (existingApplication) {
      return null
    } else {
      const res = await JobModel.findById(application.jobId)
      const cvText = await pdfToText(application.selectedCvLink)

      try {
        const evaluationAI = await evaluateCV(
          cvText as string,
          res?.description as string
        )

        const value = evaluationAI.replace(/\s+/g, '')

        if (value === 'priority') {
          application.evaluationAI = E_EvaluationAI.PRIORITY
        } else if (value === 'potential') {
          application.evaluationAI = E_EvaluationAI.POTENTIAL
        } else if (value === 'suitable') {
          application.evaluationAI = E_EvaluationAI.SUITABLE
        } else if (value === 'not_suitable') {
          application.evaluationAI = E_EvaluationAI.NOT_SUITABLE
        }
      } catch (error) {
        console.error('Error during evaluation:', error)
        application.evaluationAI = E_EvaluationAI.NONE
      }

      return await new ApplicationModel(application).save()
    }
  },
  updateApplicationStatus: async (
    applicationId: string,
    newStatus: string
  ): Promise<IApplicationDocument | null> => {
    const application = await ApplicationModel.findOneAndUpdate(
      { _id: applicationId },
      { status: newStatus },
      { new: true }
    );
  
    if (application) {
      try {
        // Lấy thông tin ứng viên
        const candidateProfile = await CandidateProfileModel.findById(application.candidateProfileId);
        if (candidateProfile) {
          const { _id } = candidateProfile;
          // Tìm người dùng (user) liên kết với ứng viên
          const USER = await UserModel.find({ candidateId: _id });
          const { email, fullName } = USER[0]; // Lấy thông tin người dùng đầu tiên
          
          // Gửi email thông báo trạng thái
          await sendApprovalEmail(email, newStatus); // Gửi email về email ứng viên
          console.log(`Email thông báo đã gửi cho ${fullName} với trạng thái: ${newStatus}`);
        }
      } catch (error) {
        console.error('Lỗi khi gửi email thông báo trạng thái:', error);
      }
    }
  
    return application;
  }
  ,
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
