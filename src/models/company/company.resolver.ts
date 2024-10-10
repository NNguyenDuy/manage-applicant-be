import { companyController } from './company.controller';
import { I_Company } from './company.types';
import mongoose from 'mongoose';

export const companyResolvers = {
  Query: {
    getAllCompanies: async (): Promise<I_Company[]> => {
      return await companyController.getAllCompanies();
    },
    getCompany: async (_: any, { id }: { id: string }): Promise<I_Company | null> => {
      return await companyController.getCompany(id);
    },
  },
  Mutation: {
    createCompany: async (
      _: any,
      { name, ownerId, locationId }: { name: string; ownerId: string; locationId?: string }
    ): Promise<{ message: string; data: I_Company | null }> => {
      // Chuyển đổi ownerId và locationId từ string sang mongoose.Types.ObjectId
      const objectIdOwnerId = new mongoose.Types.ObjectId(ownerId);
      const objectIdLocationId = locationId ? new mongoose.Types.ObjectId(locationId) : undefined;

      return await companyController.createCompany({ name, ownerId: objectIdOwnerId, locationId: objectIdLocationId });
    },
    updateCompany: async (
      _: any,
      { id, name, locationId }: { id: string; name?: string; locationId?: string }
    ): Promise<I_Company | null> => {
      // Chuyển đổi locationId từ string sang mongoose.Types.ObjectId nếu có
      const objectIdLocationId = locationId ? new mongoose.Types.ObjectId(locationId) : undefined;

      return await companyController.updateCompany(id, { name, locationId: objectIdLocationId });
    },
    deleteCompany: async (_: any, { id }: { id: string }): Promise<I_Company | null> => {
      return await companyController.deleteCompany(id);
    },
  },
};
