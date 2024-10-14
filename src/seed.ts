import bcrypt from 'bcrypt'
import { UserModel, E_Role } from './models/user'
import { LocationModel } from './models/location'
import { JobTypeModel } from './models/job-type'
import { JobCategoryModel } from './models/job-category'
import { JobModel } from './models/job'
import { CompanyModel } from './models/company'
import { CandidateProfileModel } from './models/candidate-profile'
import { ApplicationModel, E_ApplicationStatus } from './models/application'

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export async function seedData() {
  const location = await LocationModel.create({
    address: '123 Đường ABC',
    city: 'Hồ Chí Minh',
    country: 'Việt Nam',
  })

  const jobType = await JobTypeModel.create({
    type: 'Toàn thời gian',
  })

  const jobCategory = await JobCategoryModel.create({
    name: 'Công nghệ thông tin',
  })

  const company = await CompanyModel.create({
    name: 'Công ty XYZ',
    description: 'Công ty hàng đầu về công nghệ.',
    size: 100,
    field: 'Công nghệ',
    locationId: location._id,
    idDel: false,
  })

  const candidateProfile = await CandidateProfileModel.create({
    resume: {
      cvLinks: ['http://example.com/cv1.pdf'],
      skills: [
        { name: 'JavaScript', experience: 3 },
        { name: 'Node.js', experience: 2 },
      ],
    },
    idDel: false,
  })

  const hashedPassword = await hashPassword('123123')
  const users = await UserModel.insertMany([
    {
      email: 'admin@example.com',
      password: hashedPassword,
      fullName: 'Duy',
      role: E_Role.ADMIN,
    },
    {
      email: 'candidate@example.com',
      password: hashedPassword,
      fullName: 'Nguyễn Văn A',
      role: E_Role.CANDIDATE,
      candidateId: candidateProfile._id,
      companyId: null,
    },
    {
      email: 'recruiter@example.com',
      password: hashedPassword,
      fullName: 'Trần Thị B',
      role: E_Role.RECRUITER,
      candidateId: null,
      companyId: company._id,
    },
  ])

  const job = await JobModel.create({
    title: 'Lập trình viên Full Stack',
    description: 'Phát triển ứng dụng web.',
    salary: 15000000,
    experience: 2,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
    headcount: 5,
    companyId: company._id,
    jobTypeId: jobType._id,
    categoryId: jobCategory._id,
    locationId: location._id,
    idDel: false,
  })

  await ApplicationModel.create({
    jobId: job._id,
    candidateProfileId: candidateProfile._id,
    selectedCvLink: 'http://example.com/cv1.pdf',
    status: E_ApplicationStatus.SUBMITTED,
    appliedAt: new Date(),
  })

  console.log('Dữ liệu đã được khởi tạo thành công!')
}
