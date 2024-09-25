import bcrypt from 'bcrypt'

import { CompanyModel } from './models/company'
import { CandidateProfileModel } from './models/candidate-profile'
import { UserModel } from './models/user'
import { JobModel } from './models/job'

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

const companies = [
  {
    name: 'Công ty Công nghệ ABC',
    address: 'Số 12, Đường Lý Thường Kiệt, Quận Hoàn Kiếm, Hà Nội',
    description:
      'Công ty chuyên cung cấp các giải pháp phần mềm và dịch vụ IT cho doanh nghiệp.',
  },
  {
    name: 'Công ty Dịch vụ XYZ',
    address: 'Số 88, Đường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
    description:
      'Công ty chuyên tư vấn và cung cấp dịch vụ tài chính và kế toán.',
  },
  {
    name: 'Công ty TNHH Phát Triển Phần Mềm DELTA',
    address: 'Số 23, Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    description: 'Phát triển phần mềm theo yêu cầu cho các đối tác quốc tế.',
  },
  {
    name: 'Công ty Cổ Phần Kỹ Thuật FPT',
    address: 'Số 234, Đường Cầu Giấy, Quận Cầu Giấy, Hà Nội',
    description:
      'Cung cấp dịch vụ kỹ thuật và giải pháp công nghệ cho khách hàng trong và ngoài nước.',
  },
]

const candidateProfiles = [
  {
    skills: ['JavaScript', 'Node.js', 'React'],
    experience: '2-3 Years',
    cvUrl: ['https://example.com/cv-nguyenvana.pdf'],
  },
  {
    skills: ['Python', 'Django', 'Machine Learning'],
    experience: '3-4 Years',
    cvUrl: ['https://example.com/cv-tranthib.pdf'],
  },
  {
    skills: ['Java', 'Spring Boot', 'MySQL'],
    experience: 'Over 5 years',
    cvUrl: ['https://example.com/cv-lethic.pdf'],
  },
  {
    skills: ['PHP', 'Laravel', 'Vue.js'],
    experience: '1-2 Years',
    cvUrl: ['https://example.com/cv-dangvand.pdf'],
  },
  {
    skills: ['Ruby on Rails', 'PostgreSQL', 'GraphQL'],
    experience: '3-4 Years',
    cvUrl: ['https://example.com/cv-phanthie.pdf'],
  },
]

export async function seedData() {
  // Seed company data
  const insertedCompanies = await CompanyModel.insertMany(companies)
  console.log('==> Company data inserted')

  // Seed candidate profile data
  const insertedProfiles = await CandidateProfileModel.insertMany(
    candidateProfiles
  )
  console.log('==> Candidate profile data inserted')

  // Update user data with companyId and profileId
  const usersWithIds = [
    {
      fullName: 'Nguyễn Văn A',
      email: 'admin@gmail.com',
      password: await hashPassword('123123'),
      role: 'admin',
    },
    {
      fullName: 'Trần Thị B',
      email: 'recruiter1@gmail.com',
      password: await hashPassword('123123'),
      role: 'recruiter',
      companyId: insertedCompanies[0]._id,
    },
    {
      fullName: 'Lê Thị C',
      email: 'recruiter2@gmail.com',
      password: await hashPassword('123123'),
      role: 'recruiter',
      companyId: insertedCompanies[1]._id,
    },
    {
      fullName: 'Phạm Văn D',
      email: 'candidate1@gmail.com',
      password: await hashPassword('123123'),
      role: 'candidate',
      profileId: insertedProfiles[0]._id,
    },
    {
      fullName: 'Lê Thị E',
      email: 'candidate2@gmail.com',
      password: await hashPassword('123123'),
      role: 'candidate',
      profileId: insertedProfiles[1]._id,
    },
    {
      fullName: 'Đặng Văn F',
      email: 'candidate3@gmail.com',
      password: await hashPassword('123123'),
      role: 'candidate',
      profileId: insertedProfiles[2]._id,
    },
    {
      fullName: 'Phan Thị G',
      email: 'candidate4@gmail.com',
      password: await hashPassword('123123'),
      role: 'candidate',
      profileId: insertedProfiles[3]._id,
    },
    {
      fullName: 'Lê Thị H',
      email: 'candidate5@gmail.com',
      password: await hashPassword('123123'),
      role: 'candidate',
      profileId: insertedProfiles[4]._id,
    },
  ]

  // Seed user data
  const insertedUsers = await UserModel.insertMany(usersWithIds)
  console.log('==> User data inserted')

  const jobsWithApplicants = [
    {
      title: 'Lập trình viên Frontend',
      description:
        'Thiết kế và phát triển giao diện người dùng cho ứng dụng web.',
      salary: 15000000,
      position: 'Full-time',
      recruiterId: insertedUsers[1]._id,
      applicants: [
        {
          userId: insertedUsers[3]._id,
          cvUrl: 'https://example.com/cv-nguyenvana.pdf',
        },
        {
          userId: insertedUsers[4]._id,
          cvUrl: 'https://example.com/cv-tranthib.pdf',
        },
      ],
    },
    {
      title: 'Lập trình viên Backend',
      description: 'Xây dựng hệ thống backend và phát triển API.',
      salary: 20000000,
      position: 'Full-time',
      recruiterId: insertedUsers[1]._id,
      applicants: [
        {
          userId: insertedUsers[5]._id,
          cvUrl: 'https://example.com/cv-lethic.pdf',
        },
        {
          userId: insertedUsers[6]._id,
          cvUrl: 'https://example.com/cv-dangvand.pdf',
        },
      ],
    },
    {
      title: 'Chuyên viên Machine Learning',
      description: 'Phát triển mô hình Machine Learning và xử lý dữ liệu lớn.',
      salary: 25000000,
      position: 'Part-time',
      recruiterId: insertedUsers[2]._id,
      applicants: [
        {
          userId: insertedUsers[7]._id,
          cvUrl: 'https://example.com/cv-phanthie.pdf',
        },
      ],
    },
  ]

  // Seed job data
  await JobModel.insertMany(jobsWithApplicants)
  console.log('==> Job data inserted')
}
