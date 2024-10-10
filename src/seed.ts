import bcrypt from 'bcrypt';
import { CompanyModel, ICompanyDocument, I_Company } from './models/company';
import { CandidateProfileModel, ICandidateProfileDocument, I_CandidateProfile } from './models/candidate-profile';
import { E_Role, UserModel } from './models/user';
import { JobModel } from './models/job';
import { ApplicationModel, E_ApplicationStatus } from './models/application';
import { JobTypeModel } from './models/job-type';
import { LocationModel } from './models/location';
import { JobCategoryModel } from './models/job-category';
import { Types } from 'mongoose';

// Hàm để băm mật khẩu
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Seed dữ liệu
export async function seedData() {
  // Tạo Location
  const locations = await LocationModel.insertMany([
    { address: '123 Main St', city: 'Hồ Chí Minh', country: 'Việt Nam' },
    { address: '456 Second Ave', city: 'Hà Nội', country: 'Việt Nam' },
    { address: '789 Third Blvd', city: 'Đà Nẵng', country: 'Việt Nam' },
  ]);

  // Mật khẩu chung cho tất cả các user
  const hashedPassword = await hashPassword('123123');

  // Tạo User với các vai trò khác nhau: Admin, Recruiter, Candidate
  const users = await UserModel.insertMany([
    { fullName: 'Admin User', email: 'admin@example.com', password: hashedPassword, role: E_Role.ADMIN },
    { fullName: 'Recruiter One', email: 'recruiter1@example.com', password: hashedPassword, role: E_Role.RECRUITER },
    { fullName: 'Recruiter Two', email: 'recruiter2@example.com', password: hashedPassword, role: E_Role.RECRUITER },
    { fullName: 'Candidate One', email: 'candidate1@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
    { fullName: 'Candidate Two', email: 'candidate2@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
    { fullName: 'Candidate Three', email: 'candidate3@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
  ]);

  // Tạo Candidate Profile cho người dùng có vai trò CANDIDATE với interface I_CandidateProfile
  const candidateProfiles: ICandidateProfileDocument[] = await CandidateProfileModel.insertMany([
    {
      userId: users[3]._id, // Candidate One
      resume: {
        cvLinks: ['http://example.com/cv/candidate1'],
        skills: [{ name: 'JavaScript', experience: 3 }]
      }
    },
    {
      userId: users[4]._id, // Candidate Two
      resume: {
        cvLinks: ['http://example.com/cv/candidate2'],
        skills: [{ name: 'Python', experience: 2 }]
      }
    },
    {
      userId: users[5]._id, // Candidate Three
      resume: {
        cvLinks: ['http://example.com/cv/candidate3'],
        skills: [{ name: 'Java', experience: 4 }]
      }
    }
  ]) as ICandidateProfileDocument[];

  // Cập nhật Candidate Profile cho các user
  await Promise.all(users.slice(3, 6).map((user, index) => {
    user.candidateProfile = candidateProfiles[index]._id as unknown as I_CandidateProfile; // Ép kiểu candidateProfile
    return user.save();
  }));

  // Tạo Company cho Recruiter Users với interface I_Company
  const companies: ICompanyDocument[] = await CompanyModel.insertMany([
    { name: 'Recruiter One Company', ownerId: users[1]._id, locationId: locations[0]._id },
    { name: 'Recruiter Two Company', ownerId: users[2]._id, locationId: locations[1]._id },
  ]) as ICompanyDocument[];

  // Cập nhật Company cho Recruiter Users
  await Promise.all(users.slice(1, 3).map((user, index) => {
    user.company = companies[index]._id as unknown as I_Company; // Ép kiểu company
    return user.save();
  }));

  // Tạo Job Type
  const jobTypes = await JobTypeModel.insertMany([
    { type: 'Full-time' },
    { type: 'Part-time' },
    { type: 'Internship' },
  ]);

  // Tạo Job Category
  const jobCategories = await JobCategoryModel.insertMany([
    { name: 'Công nghệ thông tin' },
    { name: 'Kinh doanh' },
    { name: 'Thiết kế' },
  ]);

  // Tạo Job cho công ty của Recruiter Users
  const jobs = await JobModel.insertMany([
    {
      title: 'Kỹ sư phần mềm',
      description: 'Lập trình phần mềm',
      companyId: companies[0]._id,
      jobTypeId: jobTypes[0]._id,
      categoryIds: [jobCategories[0]._id],
      locationId: locations[0]._id,
    },
    {
      title: 'Nhân viên kinh doanh',
      description: 'Tìm kiếm khách hàng',
      companyId: companies[1]._id,
      jobTypeId: jobTypes[1]._id,
      categoryIds: [jobCategories[1]._id],
      locationId: locations[1]._id,
    },
    {
      title: 'Thực tập sinh thiết kế',
      description: 'Hỗ trợ thiết kế',
      companyId: companies[0]._id,
      jobTypeId: jobTypes[2]._id,
      categoryIds: [jobCategories[2]._id],
      locationId: locations[2]._id,
    }
  ]);

  // Tạo Application cho các CANDIDATE sử dụng enum E_ApplicationStatus
  await ApplicationModel.insertMany([
    { jobId: jobs[0]._id, candidateProfileId: candidateProfiles[0]._id, status: E_ApplicationStatus.SUBMITTED },
    { jobId: jobs[1]._id, candidateProfileId: candidateProfiles[1]._id, status: E_ApplicationStatus.UNDER_REVIEW },
    { jobId: jobs[2]._id, candidateProfileId: candidateProfiles[2]._id, status: E_ApplicationStatus.ACCEPTED },
  ]);

  console.log('Dữ liệu đã được seed thành công');
}
