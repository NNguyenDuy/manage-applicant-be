import { companyController } from './company.controller'
import { I_Company } from './company.types'
import { I_Job, JobModel } from '../job'
import mongoose from 'mongoose'

export const companyResolvers = {
  Query: {
    getAllCompanies: async (): Promise<I_Company[]> => {
      return await companyController.getAllCompanies()
    },
    getCompany: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_Company | null> => {
      return await companyController.getCompany(id)
    },
  },
  Company: {
    jobs: async (parent: I_Job) => {
      return await JobModel.find({ companyId: parent.companyId })
    },
  },
  Mutation: {
    createCompany: async (
      _: any,
      {
        name,
        ownerId,
        locationId,
      }: { name: string; ownerId: string; locationId?: string }
    ): Promise<{ message: string; data: I_Company | null }> => {
      const objectIdOwnerId = new mongoose.Types.ObjectId(ownerId)
      const objectIdLocationId = locationId
        ? new mongoose.Types.ObjectId(locationId)
        : undefined

      return await companyController.createCompany({
        name,
        ownerId: objectIdOwnerId,
        locationId: objectIdLocationId,
      })
    },
    updateCompany: async (
      _: any,
      {
        id,
        name,
        locationId,
      }: { id: string; name?: string; locationId?: string }
    ): Promise<I_Company | null> => {
      const objectIdLocationId = locationId
        ? new mongoose.Types.ObjectId(locationId)
        : undefined

      return await companyController.updateCompany(id, {
        name,
        locationId: objectIdLocationId,
      })
    },
    deleteCompany: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_Company | null> => {
      return await companyController.deleteCompany(id)
    },
  },
}
