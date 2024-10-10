import { I_Company } from './company.types';
import { CompanyModel } from './company.model';
import { LocationModel } from '../location/location.model';
import { JobModel } from '../job';

export const companyController = {
  getAllCompanies: async (): Promise<I_Company[]> => {
    return await CompanyModel.find().populate('locationId jobs').exec();
  },

  getCompany: async (id: string): Promise<I_Company | null> => {
    return await CompanyModel.findById(id).populate('locationId jobs').exec();
  },

  createCompany: async (
    company: I_Company
  ): Promise<{ message: string; data: I_Company | null }> => {
    const newCompany = new CompanyModel(company);
    const savedCompany = await newCompany.save();

    return {
      message: 'Company created successfully.',
      data: savedCompany.toObject(),
    };
  },

  updateCompany: async (
    id: string,
    companyData: Partial<I_Company>
  ): Promise<I_Company | null> => {
    if (companyData.locationId) {
      const location = await LocationModel.findById(companyData.locationId);
      if (!location) {
        throw new Error('Invalid location ID');
      }
    }

    return await CompanyModel.findByIdAndUpdate(id, companyData, { new: true }).exec();
  },

  deleteCompany: async (id: string): Promise<I_Company | null> => {
    const company = await CompanyModel.findByIdAndDelete(id).exec();
    if (company?.jobs) {
      await JobModel.deleteMany({ _id: { $in: company.jobs } });
    }
    return company;
  },
};
