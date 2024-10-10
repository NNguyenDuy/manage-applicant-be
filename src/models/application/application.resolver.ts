import { applicationController } from './application.controller';
import { I_Application, E_ApplicationStatus } from './application.types'; // Import E_ApplicationStatus
import mongoose from 'mongoose';

export const applicationResolvers = {
  Query: {
    getAllApplications: async (): Promise<I_Application[]> => {
      return await applicationController.getAllApplications();
    },
    getApplication: async (_: any, { id }: { id: string }): Promise<I_Application | null> => {
      return await applicationController.getApplication(id);
    },
  },
  Mutation: {
    createApplication: async (
      _: any,
      { jobId, candidateProfileId }: { jobId: string; candidateProfileId: string }
    ): Promise<{ message: string; data: I_Application | null }> => {
      const objectIdJobId = new mongoose.Types.ObjectId(jobId);
      const objectIdCandidateProfileId = new mongoose.Types.ObjectId(candidateProfileId);

      // Tạo một đối tượng I_Application đầy đủ
      const newApplication: I_Application = {
        jobId: objectIdJobId,
        candidateProfileId: objectIdCandidateProfileId,
        status: E_ApplicationStatus.SUBMITTED, // Mặc định trạng thái là SUBMITTED
        appliedAt: new Date(), // Lưu thời gian hiện tại
      };

      return await applicationController.createApplication(newApplication);
    },
    updateApplicationStatus: async (
      _: any,
      { id, status }: { id: string; status: string }
    ): Promise<I_Application | null> => {
      return await applicationController.updateApplicationStatus(id, status);
    },
    deleteApplication: async (_: any, { id }: { id: string }): Promise<I_Application | null> => {
      return await applicationController.deleteApplication(id);
    },
  },
};
