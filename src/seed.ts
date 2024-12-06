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
  const locations = await LocationModel.insertMany([
    {
      address: '123 Đường ABC',
      city: 'Hồ Chí Minh',
      country: 'Việt Nam',
    },
    {
      address: '123 Đường XYZ',
      city: 'Hà Nội',
      country: 'Việt Nam',
    },
    {
      address: '123 Đường DEF',
      city: 'Đà Nẵng',
      country: 'Việt Nam',
    },
    {
      address: '123 Đường GHI',
      city: 'Hải Phòng',
      country: 'Việt Nam',
    },
    {
      address: '123 Đường KLM',
      city: 'Cần Thơ',
      country: 'Việt Nam',
    },
    {
      address: '123 Đường NOP',
      city: 'Hải Dương',
      country: 'Việt Nam',
    },
    {
      address: '123 Đường QRS',
      city: 'Quảng Ninh',
      country: 'Việt Nam',
    },
  ])

  const jobTypes = await JobTypeModel.insertMany([
    { type: 'Toàn thời gian' },
    { type: 'Bán thời gian' },
    { type: 'Thực tập' },
    { type: 'Hợp đồng' },
    { type: 'Thời vụ' },
  ])

  const jobCategories = await JobCategoryModel.insertMany([
    { name: 'Công nghệ thông tin' },
    { name: 'Kế toán' },
    { name: 'Nhân sự' },
    { name: 'Marketing' },
    { name: 'Bán hàng' },
    { name: 'Thiết kế' },
    { name: 'Sản xuất' },
  ])

  const companies = await CompanyModel.insertMany([
    {
      name: 'Công ty XYZ',
      description: 'Công ty hàng đầu về công nghệ.',
      size: 100,
      field: 'Công nghệ',
      locationId: locations[0]._id,
      isDel: false,
    },
    {
      name: 'Công ty ABC',
      description: 'Công ty chuyên về phần mềm.',
      size: 150,
      field: 'Phần mềm',
      locationId: locations[1]._id,
      isDel: false,
    },
    {
      name: 'Công ty DEF',
      description: 'Công ty chuyên về tài chính.',
      size: 200,
      field: 'Tài chính',
      locationId: locations[2]._id,
      isDel: false,
    },
    {
      name: 'Công ty GHI',
      description: 'Công ty hàng đầu về dịch vụ.',
      size: 300,
      field: 'Dịch vụ',
      locationId: locations[3]._id,
      isDel: false,
    },
    {
      name: 'Công ty JKL',
      description: 'Công ty chuyên về sản xuất.',
      size: 500,
      field: 'Sản xuất',
      locationId: locations[4]._id,
      isDel: false,
    },
    {
      name: 'Công ty MNO',
      description: 'Công ty hàng đầu về thương mại.',
      size: 1000,
      field: 'Thương mại',
      locationId: locations[5]._id,
      isDel: false,
    },
  ])

  // Thêm hồ sơ ứng viên (mỗi ứng viên sẽ có 1 hồ sơ)
  const candidateProfiles = await CandidateProfileModel.insertMany([
    {
      resume: {
        cvLinks: ['/uploads/[candidate1@example.com]-cyber.pdf'],
        skills: [
          { name: 'JavaScript', experience: 3 },
          { name: 'Node.js', experience: 2 },
        ],
      },
      isDel: false,
    },
    {
      resume: {
        cvLinks: ['/uploads/[candidate2@example.com]-cyber.pdf'],
        skills: [
          { name: 'Python', experience: 4 },
          { name: 'Django', experience: 3 },
        ],
      },
      isDel: false,
    },
    {
      resume: {
        cvLinks: ['/uploads/[candidate3@example.com]-cyber.pdf'],
        skills: [
          { name: 'React', experience: 2 },
          { name: 'Next.js', experience: 1 },
        ],
      },
      isDel: false,
    },
    {
      resume: {
        cvLinks: ['/uploads/[candidate4@example.com]-cyber.pdf'],
        skills: [
          { name: 'C#', experience: 4 },
          { name: '.NET', experience: 3 },
        ],
      },
      isDel: false,
    },
    {
      resume: {
        cvLinks: ['/uploads/[candidate5@example.com]-cyber.pdf'],
        skills: [
          { name: 'PHP', experience: 3 },
          { name: 'Laravel', experience: 2 },
        ],
      },
      isDel: false,
    },
  ])

  // Tạo mật khẩu đã băm
  const hashedPassword = await hashPassword('123123')
  const users = await UserModel.insertMany([
    {
      email: 'admin@example.com',
      password: hashedPassword,
      fullName: 'Duy',
      role: E_Role.ADMIN,
    },
    {
      email: 'candidate1@example.com',
      password: hashedPassword,
      fullName: 'Nguyễn Văn A',
      role: E_Role.CANDIDATE,
      candidateId: candidateProfiles[0]._id,
      companyId: null,
    },
    {
      email: 'candidate2@example.com',
      password: hashedPassword,
      fullName: 'Trần Văn B',
      role: E_Role.CANDIDATE,
      candidateId: candidateProfiles[1]._id,
      companyId: null,
    },
    {
      email: 'candidate3@example.com',
      password: hashedPassword,
      fullName: 'Lê Thị C',
      role: E_Role.CANDIDATE,
      candidateId: candidateProfiles[2]._id,
      companyId: null,
    },
    {
      email: 'candidate4@example.com',
      password: hashedPassword,
      fullName: 'Phạm Văn D',
      role: E_Role.CANDIDATE,
      candidateId: candidateProfiles[3]._id,
      companyId: null,
    },
    {
      email: 'candidate5@example.com',
      password: hashedPassword,
      fullName: 'Nguyễn Thị E',
      role: E_Role.CANDIDATE,
      candidateId: candidateProfiles[4]._id,
      companyId: null,
    },
    {
      email: 'recruiter1@example.com',
      password: hashedPassword,
      fullName: 'Trần Thị F',
      role: E_Role.RECRUITER,
      candidateId: null,
      companyId: companies[0]._id,
    },
    {
      email: 'recruiter2@example.com',
      password: hashedPassword,
      fullName: 'Nguyễn Văn G',
      role: E_Role.RECRUITER,
      candidateId: null,
      companyId: companies[1]._id,
    },
    {
      email: 'recruiter3@example.com',
      password: hashedPassword,
      fullName: 'Lê Thị H',
      role: E_Role.RECRUITER,
      candidateId: null,
      companyId: companies[2]._id,
    },
    {
      email: 'recruiter4@example.com',
      password: hashedPassword,
      fullName: 'Phạm Văn K',
      role: E_Role.RECRUITER,
      candidateId: null,
      companyId: companies[3]._id,
    },
    {
      email: 'recruiter5@example.com',
      password: hashedPassword,
      fullName: 'Trần Thị M',
      role: E_Role.RECRUITER,
      candidateId: null,
      companyId: companies[4]._id,
    },
  ])

  const jobs = await JobModel.insertMany([
    {
      title: 'Lập trình viên Full Stack',
      description: 'Phát triển ứng dụng web.',
      salary: 15000000,
      experience: 2,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 5,
      companyId: companies[0]._id,
      jobTypeId: jobTypes[0]._id,
      categoryId: jobCategories[0]._id,
      locationId: locations[0]._id,
      isDel: false,
    },
    {
      title: 'DevOps Engineer',
      description: 'Quản lý hệ thống và triển khai CI/CD.',
      salary: 17000000,
      experience: 3,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 2,
      companyId: companies[0]._id,
      jobTypeId: jobTypes[0]._id,
      categoryId: jobCategories[0]._id,
      locationId: locations[0]._id,
      isDel: false,
    },
    {
      title: 'Chuyên viên kế toán',
      description: 'Quản lý sổ sách kế toán.',
      salary: 12000000,
      experience: 1,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 3,
      companyId: companies[1]._id,
      jobTypeId: jobTypes[1]._id,
      categoryId: jobCategories[1]._id,
      locationId: locations[1]._id,
      isDel: false,
    },
    {
      title: 'Tư vấn tài chính',
      description: 'Tư vấn và quản lý tài chính cho khách hàng.',
      salary: 14000000,
      experience: 2,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 4,
      companyId: companies[1]._id,
      jobTypeId: jobTypes[1]._id,
      categoryId: jobCategories[2]._id,
      locationId: locations[1]._id,
      isDel: false,
    },
    {
      title: 'Chuyên viên dịch vụ khách hàng',
      description: 'Cung cấp dịch vụ khách hàng chất lượng cao.',
      salary: 13000000,
      experience: 2,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 3,
      companyId: companies[2]._id,
      jobTypeId: jobTypes[2]._id,
      categoryId: jobCategories[3]._id,
      locationId: locations[2]._id,
      isDel: false,
    },
    {
      title: 'Quản lý dự án',
      description: 'Quản lý các dự án lớn về tài chính.',
      salary: 20000000,
      experience: 5,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 2,
      companyId: companies[2]._id,
      jobTypeId: jobTypes[2]._id,
      categoryId: jobCategories[2]._id,
      locationId: locations[2]._id,
      isDel: false,
    },
    {
      title: 'Quản đốc sản xuất',
      description: 'Giám sát và quản lý quy trình sản xuất.',
      salary: 18000000,
      experience: 4,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 6,
      companyId: companies[3]._id,
      jobTypeId: jobTypes[0]._id,
      categoryId: jobCategories[4]._id,
      locationId: locations[3]._id,
      isDel: false,
    },
    {
      title: 'Nhân viên kho vận',
      description: 'Quản lý kho và quy trình vận chuyển hàng hóa.',
      salary: 11000000,
      experience: 1,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 10,
      companyId: companies[3]._id,
      jobTypeId: jobTypes[0]._id,
      categoryId: jobCategories[4]._id,
      locationId: locations[3]._id,
      isDel: false,
    },
    {
      title: 'Trưởng nhóm bán hàng',
      description: 'Quản lý đội ngũ bán hàng.',
      salary: 15000000,
      experience: 3,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 5,
      companyId: companies[4]._id,
      jobTypeId: jobTypes[1]._id,
      categoryId: jobCategories[5]._id,
      locationId: locations[4]._id,
      isDel: false,
    },
    {
      title: 'Nhân viên tiếp thị',
      description: 'Lên kế hoạch và triển khai các chiến dịch tiếp thị.',
      salary: 12000000,
      experience: 2,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 7,
      companyId: companies[4]._id,
      jobTypeId: jobTypes[3]._id,
      categoryId: jobCategories[6]._id,
      locationId: locations[4]._id,
      isDel: false,
    },
    {
      title: 'Chuyên viên chăm sóc khách hàng',
      description: 'Cung cấp dịch vụ chăm sóc khách hàng.',
      salary: 10000000,
      experience: 1,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 3,
      companyId: companies[5]._id,
      jobTypeId: jobTypes[2]._id,
      categoryId: jobCategories[6]._id,
      locationId: locations[5]._id,
      isDel: false,
    },
    {
      title: 'Nhân viên bán hàng trực tuyến',
      description: 'Quản lý bán hàng trên các nền tảng trực tuyến.',
      salary: 13000000,
      experience: 2,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      headcount: 8,
      companyId: companies[5]._id,
      jobTypeId: jobTypes[3]._id,
      categoryId: jobCategories[5]._id,
      locationId: locations[5]._id,
      isDel: false,
    },
  ])

  const applications = await ApplicationModel.insertMany([
    // Ứng tuyển cho job 1
    {
      jobId: jobs[0]._id,
      candidateProfileId: candidateProfiles[0]._id,
      selectedCvLink: '/uploads/[candidate1@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[0]._id,
      candidateProfileId: candidateProfiles[1]._id,
      selectedCvLink: '/uploads/[candidate2@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },

    // Ứng tuyển cho job 2
    {
      jobId: jobs[1]._id,
      candidateProfileId: candidateProfiles[2]._id,
      selectedCvLink: '/uploads/[candidate3@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[1]._id,
      candidateProfileId: candidateProfiles[3]._id,
      selectedCvLink: '/uploads/[candidate4@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },

    // Ứng tuyển cho job 3
    {
      jobId: jobs[2]._id,
      candidateProfileId: candidateProfiles[4]._id,
      selectedCvLink: '/uploads/[candidate5@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[2]._id,
      candidateProfileId: candidateProfiles[0]._id,
      selectedCvLink: '/uploads/[candidate1@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },

    // Ứng tuyển cho job 4
    {
      jobId: jobs[3]._id,
      candidateProfileId: candidateProfiles[1]._id,
      selectedCvLink: '/uploads/[candidate2@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[3]._id,
      candidateProfileId: candidateProfiles[2]._id,
      selectedCvLink: '/uploads/[candidate3@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },

    // Ứng tuyển cho job 5
    {
      jobId: jobs[4]._id,
      candidateProfileId: candidateProfiles[3]._id,
      selectedCvLink: '/uploads/[candidate4@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[4]._id,
      candidateProfileId: candidateProfiles[4]._id,
      selectedCvLink: '/uploads/[candidate5@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },

    // Ứng tuyển cho job 6
    {
      jobId: jobs[5]._id,
      candidateProfileId: candidateProfiles[0]._id,
      selectedCvLink: '/uploads/[candidate1@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[5]._id,
      candidateProfileId: candidateProfiles[1]._id,
      selectedCvLink: '/uploads/[candidate2@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },

    // Ứng tuyển cho job 7
    {
      jobId: jobs[6]._id,
      candidateProfileId: candidateProfiles[2]._id,
      selectedCvLink: '/uploads/[candidate3@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[6]._id,
      candidateProfileId: candidateProfiles[3]._id,
      selectedCvLink: '/uploads/[candidate4@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },

    // Ứng tuyển cho job 8
    {
      jobId: jobs[7]._id,
      candidateProfileId: candidateProfiles[4]._id,
      selectedCvLink: '/uploads/[candidate5@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[7]._id,
      candidateProfileId: candidateProfiles[0]._id,
      selectedCvLink: '/uploads/[candidate1@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },

    // Ứng tuyển cho job 9
    {
      jobId: jobs[8]._id,
      candidateProfileId: candidateProfiles[1]._id,
      selectedCvLink: '/uploads/[candidate2@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[8]._id,
      candidateProfileId: candidateProfiles[2]._id,
      selectedCvLink: '/uploads/[candidate3@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },

    // Ứng tuyển cho job 10
    {
      jobId: jobs[9]._id,
      candidateProfileId: candidateProfiles[3]._id,
      selectedCvLink: '/uploads/[candidate4@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[9]._id,
      candidateProfileId: candidateProfiles[4]._id,
      selectedCvLink: '/uploads/[candidate5@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },

    // Ứng tuyển cho job 11
    {
      jobId: jobs[10]._id,
      candidateProfileId: candidateProfiles[0]._id,
      selectedCvLink: '/uploads/[candidate1@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[10]._id,
      candidateProfileId: candidateProfiles[1]._id,
      selectedCvLink: '/uploads/[candidate2@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },

    // Ứng tuyển cho job 12
    {
      jobId: jobs[11]._id,
      candidateProfileId: candidateProfiles[2]._id,
      selectedCvLink: '/uploads/[candidate3@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
    {
      jobId: jobs[11]._id,
      candidateProfileId: candidateProfiles[3]._id,
      selectedCvLink: '/uploads/[candidate4@example.com]-cyber.pdf',
      status: E_ApplicationStatus.SUBMITTED,
      appliedAt: new Date(),
    },
  ])

  console.log('Dữ liệu đã được khởi tạo thành công!')
}
