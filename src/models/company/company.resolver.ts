import { I_Job } from '../job'
import { I_Location } from '../location'
import { locationController } from '../location/location.controller'
import { CompanyModel, ICompanyDocument } from './company.model'
import { I_Company } from './company.types'

export const companyResolvers = {
  Query: {
    getCompanyById: async (
      _: any,
      { companyId }: { companyId: string }
    ): Promise<ICompanyDocument | null> => {
      return await CompanyModel.findById(companyId).where({ isDel: false })
    },
    getAllCompanies: async (): Promise<ICompanyDocument[]> => {
      return await CompanyModel.find({ isDel: false })
    },
  },
  Company: {
    location: async (parent: I_Company): Promise<I_Location | null> => {
      if (!parent.locationId) return null
      return await locationController.getLocationById(
        parent.locationId.toString()
      )
    },
  },
  Mutation: {
    createCompany: async (
      _: any,
      { companyData }: { companyData: I_Company }
    ): Promise<ICompanyDocument> => {
      const company = new CompanyModel(companyData)
      return await company.save()
    },
    updateCompany: async (
      _: any,
      { companyId, companyData }: { companyId: string; companyData: I_Company }
    ): Promise<ICompanyDocument | null> => {
      return await CompanyModel.findByIdAndUpdate(companyId, companyData, {
        new: true,
      })
    },
    deleteCompany: async (
      _: any,
      { companyId }: { companyId: string }
    ): Promise<boolean> => {
      await CompanyModel.findByIdAndUpdate(companyId, { isDel: true })
      return true
    },
  },
}
