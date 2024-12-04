import { I_Company } from './company.types'
import { CompanyModel, ICompanyDocument } from './company.model'

export const companyController = {
  getAllCompanies: async (): Promise<I_Company[]> => {
    return await CompanyModel.find()
  },

  getCompanyById: async (id: string): Promise<ICompanyDocument | null> => {
    return await CompanyModel.findOne({ _id: id })
  },

  createCompany: async (company: I_Company): Promise<ICompanyDocument> => {
    const newCompany = new CompanyModel(company)
    return await newCompany.save()
  },

  updateCompany: async (
    id: string,
    company: Partial<I_Company>
  ): Promise<ICompanyDocument | null> => {
    return await CompanyModel.findByIdAndUpdate(id, company, { new: true })
  },

  deleteCompany: async (id: string): Promise<ICompanyDocument | null> => {
    return await CompanyModel.findByIdAndUpdate(
      id,
      { isDel: true },
      { new: true }
    )
  },
}
