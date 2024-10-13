import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { UserModel, E_Role } from './models/user';
import { LocationModel } from './models/location';
import { JobTypeModel } from './models/job-type';
import { JobCategoryModel } from './models/job-category';
import { JobModel } from './models/job';
import { CompanyModel } from './models/company';
import { CandidateProfileModel } from './models/candidate-profile';
import { ApplicationModel, E_ApplicationStatus } from './models/application';

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function seedData() {
  try {
    // Seed Locations (10 locations)
    const locations = await LocationModel.insertMany([
      { address: '123 Nguyen Hue', city: 'Ho Chi Minh City', country: 'Vietnam' },
      { address: '456 Le Loi', city: 'Hanoi', country: 'Vietnam' },
      { address: '789 Tran Phu', city: 'Da Nang', country: 'Vietnam' },
      { address: '101 Vo Van Tan', city: 'Can Tho', country: 'Vietnam' },
      { address: '202 Phan Chu Trinh', city: 'Hue', country: 'Vietnam' },
      { address: '303 Le Duan', city: 'Nha Trang', country: 'Vietnam' },
      { address: '404 Tran Hung Dao', city: 'Hai Phong', country: 'Vietnam' },
      { address: '505 Nguyen Trai', city: 'Vung Tau', country: 'Vietnam' },
      { address: '606 Le Thanh Ton', city: 'Quy Nhon', country: 'Vietnam' },
      { address: '707 Hai Ba Trung', city: 'Buon Ma Thuot', country: 'Vietnam' },
    ]);

    // Seed Job Types (4 job types)
    const jobTypes = await JobTypeModel.insertMany([
      { type: 'Full-time' },
      { type: 'Part-time' },
      { type: 'Contract' },
      { type: 'Internship' },
    ]);

    // Seed Job Categories (10 categories)
    const jobCategories = await JobCategoryModel.insertMany([
      { name: 'Software Development' },
      { name: 'Data Science' },
      { name: 'Design' },
      { name: 'Marketing' },
      { name: 'Sales' },
      { name: 'Customer Service' },
      { name: 'Finance' },
      { name: 'Human Resources' },
      { name: 'Project Management' },
      { name: 'Business Analysis' },
    ]);

    // Seed Users (41 users: 1 admin, 10 recruiters, 30 candidates)
    const hashedPassword = await hashPassword('123123');
    const users = await UserModel.insertMany([
      { fullName: 'Admin User', email: 'admin@example.com', password: hashedPassword, role: E_Role.ADMIN },
      { fullName: 'Recruiter 1', email: 'recruiter1@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Recruiter 2', email: 'recruiter2@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Recruiter 3', email: 'recruiter3@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Recruiter 4', email: 'recruiter4@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Recruiter 5', email: 'recruiter5@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Recruiter 6', email: 'recruiter6@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Recruiter 7', email: 'recruiter7@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Recruiter 8', email: 'recruiter8@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Recruiter 9', email: 'recruiter9@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Recruiter 10', email: 'recruiter10@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Candidate 1', email: 'candidate1@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 2', email: 'candidate2@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 3', email: 'candidate3@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 4', email: 'candidate4@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 5', email: 'candidate5@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 6', email: 'candidate6@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 7', email: 'candidate7@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 8', email: 'candidate8@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 9', email: 'candidate9@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 10', email: 'candidate10@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 11', email: 'candidate11@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 12', email: 'candidate12@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 13', email: 'candidate13@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 14', email: 'candidate14@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 15', email: 'candidate15@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 16', email: 'candidate16@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 17', email: 'candidate17@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 18', email: 'candidate18@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 19', email: 'candidate19@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 20', email: 'candidate20@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 21', email: 'candidate21@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 22', email: 'candidate22@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 23', email: 'candidate23@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 24', email: 'candidate24@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 25', email: 'candidate25@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 26', email: 'candidate26@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 27', email: 'candidate27@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 28', email: 'candidate28@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 29', email: 'candidate29@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate 30', email: 'candidate30@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
    ]);

    // Seed Companies (10 companies)
    const companies = await CompanyModel.insertMany([
      { name: 'Tech Solutions', ownerId: users[1]._id, locationId: locations[0]._id },
      { name: 'Data Insights', ownerId: users[2]._id, locationId: locations[1]._id },
      { name: 'Creative Designs', ownerId: users[3]._id, locationId: locations[2]._id },
      { name: 'Marketing Pros', ownerId: users[4]._id, locationId: locations[3]._id },
      { name: 'Sales Force', ownerId: users[5]._id, locationId: locations[4]._id },
      { name: 'Customer First', ownerId: users[6]._id, locationId: locations[5]._id },
      { name: 'Finance Experts', ownerId: users[7]._id, locationId: locations[6]._id },
      { name: 'HR Solutions', ownerId: users[8]._id, locationId: locations[7]._id },
      { name: 'Project Masters', ownerId: users[9]._id, locationId: locations[8]._id },
      { name: 'Business Analysts Inc', ownerId: users[10]._id, locationId: locations[9]._id },
    ]);

    // Update Recruiter Users with Company
    await UserModel.bulkWrite([
      { updateOne: { filter: { _id: users[1]._id }, update: { $set: { company: companies[0]._id } } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { $set: { company: companies[1]._id } } } },
      { updateOne: { filter: { _id: users[3]._id }, update: { $set: { company: companies[2]._id } } } },
      { updateOne: { filter: { _id: users[4]._id }, update: { $set: { company: companies[3]._id } } } },
      { updateOne: { filter: { _id: users[5]._id }, update: { $set: { company: companies[4]._id } } } },
      { updateOne: { filter: { _id: users[6]._id }, update: { $set: { company: companies[5]._id } } } },
      { updateOne: { filter: { _id: users[7]._id }, update: { $set: { company: companies[6]._id } } } },
      { updateOne: { filter: { _id: users[8]._id }, update: { $set: { company: companies[7]._id } } } },
      { updateOne: { filter: { _id: users[9]._id }, update: { $set: { company: companies[8]._id } } } },
      { updateOne: { filter: { _id: users[10]._id }, update: { $set: { company: companies[9]._id } } } },
    ]);

    // Seed Candidate Profiles (30 profiles)
    const candidateProfiles = await CandidateProfileModel.insertMany([
      { userId: users[11]._id, resume: { cvLinks: ['http://example.com/cv1.pdf'], skills: [{ name: 'JavaScript', experience: 3 }, { name: 'React', experience: 2 }, { name: 'Node.js', experience: 1 }] } },
      { userId: users[12]._id, resume: { cvLinks: ['http://example.com/cv2.pdf'], skills: [{ name: 'Python', experience: 4 }, { name: 'Machine Learning', experience: 2 }, { name: 'SQL', experience: 3 }] } },
      { userId: users[13]._id, resume: { cvLinks: ['http://example.com/cv3.pdf'], skills: [{ name: 'UI/UX Design', experience: 5 }, { name: 'Adobe Creative Suite', experience: 4 }, { name: 'Figma', experience: 3 }] } },
      { userId: users[14]._id, resume: { cvLinks: ['http://example.com/cv4.pdf'], skills: [{ name: 'Digital Marketing', experience: 3 }, { name: 'SEO', experience: 2 }, { name: 'Content Writing', experience: 4 }] } },
      { userId: users[15]._id, resume: { cvLinks: ['http://example.com/cv5.pdf'], skills: [{ name: 'Sales Strategy', experience: 6 }, { name: 'CRM', experience: 4 }, { name: 'Negotiation', experience: 5 }] } },
      { userId: users[16]._id, resume: { cvLinks: ['http://example.com/cv6.pdf'], skills: [{ name: 'Customer Service', experience: 2 }, { name: 'Communication', experience: 3 }, { name: 'Problem Solving', experience: 2 }] } },
      { userId: users[17]._id, resume: { cvLinks: ['http://example.com/cv7.pdf'], skills: [{ name: 'Financial Analysis', experience: 5 }, { name: 'Excel', experience: 6 }, { name: 'Financial Modeling', experience: 4 }] } },
      { userId: users[18]._id, resume: { cvLinks: ['http://example.com/cv8.pdf'], skills: [{ name: 'Recruitment', experience: 3 }, { name: 'Employee Relations', experience: 2 }, { name: 'HR Policies', experience: 4 }] } },
      { userId: users[19]._id, resume: { cvLinks: ['http://example.com/cv9.pdf'], skills: [{ name: 'Project Management', experience: 7 }, { name: 'Agile', experience: 5 }, { name: 'Scrum', experience: 4 }] } },
      { userId: users[20]._id, resume: { cvLinks: ['http://example.com/cv10.pdf'], skills: [{ name: 'Business Analysis', experience: 4 }, { name: 'Requirements Gathering', experience: 3 }, { name: 'Process Modeling', experience: 2 }] } },
      { userId: users[21]._id, resume: { cvLinks: ['http://example.com/cv11.pdf'], skills: [{ name: 'Java', experience: 5 }, { name: 'Spring Framework', experience: 3 }, { name: 'Hibernate', experience: 2 }] } },
      { userId: users[22]._id, resume: { cvLinks: ['http://example.com/cv12.pdf'], skills: [{ name: 'Data Visualization', experience: 3 }, { name: 'Tableau', experience: 2 }, { name: 'Power BI', experience: 1 }] } },
      { userId: users[23]._id, resume: { cvLinks: ['http://example.com/cv13.pdf'], skills: [{ name: 'Graphic Design', experience: 4 }, { name: 'Illustrator', experience: 3 }, { name: 'Photoshop', experience: 4 }] } },
      { userId: users[24]._id, resume: { cvLinks: ['http://example.com/cv14.pdf'], skills: [{ name: 'Social Media Marketing', experience: 3 }, { name: 'Google Analytics', experience: 2 }, { name: 'Email Marketing', experience: 2 }] } },
      { userId: users[25]._id, resume: { cvLinks: ['http://example.com/cv15.pdf'], skills: [{ name: 'Account Management', experience: 5 }, { name: 'B2B Sales', experience: 4 }, { name: 'Sales Forecasting', experience: 3 }] } },
      { userId: users[26]._id, resume: { cvLinks: ['http://example.com/cv16.pdf'], skills: [{ name: 'Technical Support', experience: 2 }, { name: 'Troubleshooting', experience: 3 }, { name: 'Customer Satisfaction', experience: 2 }] } },
      { userId: users[27]._id, resume: { cvLinks: ['http://example.com/cv17.pdf'], skills: [{ name: 'Risk Management', experience: 4 }, { name: 'Financial Reporting', experience: 3 }, { name: 'Budgeting', experience: 3 }] } },
      { userId: users[28]._id, resume: { cvLinks: ['http://example.com/cv18.pdf'], skills: [{ name: 'Talent Acquisition', experience: 4 }, { name: 'Performance Management', experience: 3 }, { name: 'HRIS', experience: 2 }] } },
      { userId: users[29]._id, resume: { cvLinks: ['http://example.com/cv19.pdf'], skills: [{ name: 'Risk Assessment', experience: 5 }, { name: 'Quality Management', experience: 4 }, { name: 'Stakeholder Management', experience: 3 }] } },
      { userId: users[30]._id, resume: { cvLinks: ['http://example.com/cv20.pdf'], skills: [{ name: 'Data Analysis', experience: 3 }, { name: 'SQL', experience: 4 }, { name: 'Business Intelligence', experience: 2 }] } },
      { userId: users[31]._id, resume: { cvLinks: ['http://example.com/cv21.pdf'], skills: [{ name: 'C#', experience: 4 }, { name: '.NET Framework', experience: 3 }, { name: 'ASP.NET', experience: 2 }] } },
      { userId: users[32]._id, resume: { cvLinks: ['http://example.com/cv22.pdf'], skills: [{ name: 'Big Data', experience: 3 }, { name: 'Hadoop', experience: 2 }, { name: 'Spark', experience: 1 }] } },
      { userId: users[33]._id, resume: { cvLinks: ['http://example.com/cv23.pdf'], skills: [{ name: 'Mobile App Design', experience: 4 }, { name: 'Sketch', experience: 3 }, { name: 'Prototyping', experience: 3 }] } },
      { userId: users[34]._id, resume: { cvLinks: ['http://example.com/cv24.pdf'], skills: [{ name: 'Content Strategy', experience: 4 }, { name: 'Copywriting', experience: 3 }, { name: 'Brand Management', experience: 2 }] } },
      { userId: users[35]._id, resume: { cvLinks: ['http://example.com/cv25.pdf'], skills: [{ name: 'Sales Operations', experience: 5 }, { name: 'Sales Analytics', experience: 3 }, { name: 'Territory Management', experience: 4 }] } },
      { userId: users[36]._id, resume: { cvLinks: ['http://example.com/cv26.pdf'], skills: [{ name: 'Help Desk Support', experience: 3 }, { name: 'IT Service Management', experience: 2 }, { name: 'Network Troubleshooting', experience: 2 }] } },
      { userId: users[37]._id, resume: { cvLinks: ['http://example.com/cv27.pdf'], skills: [{ name: 'Accounting', experience: 5 }, { name: 'Taxation', experience: 4 }, { name: 'Auditing', experience: 3 }] } },
      { userId: users[38]._id, resume: { cvLinks: ['http://example.com/cv28.pdf'], skills: [{ name: 'Compensation and Benefits', experience: 4 }, { name: 'Labor Laws', experience: 3 }, { name: 'Employee Engagement', experience: 3 }] } },
      { userId: users[39]._id, resume: { cvLinks: ['http://example.com/cv29.pdf'], skills: [{ name: 'Agile Project Management', experience: 6 }, { name: 'JIRA', experience: 4 }, { name: 'Confluence', experience: 3 }] } },
      { userId: users[40]._id, resume: { cvLinks: ['http://example.com/cv30.pdf'], skills: [{ name: 'Process Improvement', experience: 5 }, { name: 'Six Sigma', experience: 3 }, { name: 'Lean Methodology', experience: 4 }] } },
    ]);

    // Update Candidate Users with CandidateProfile
    await UserModel.bulkWrite(
      candidateProfiles.map((profile, index) => ({
        updateOne: {
          filter: { _id: users[index + 11]._id },
          update: { $set: { candidateProfile: profile._id } }
        }
      }))
    );

    // Seed Jobs (30 jobs)
    const jobs = await JobModel.insertMany([
      { title: 'Senior Frontend Developer', description: 'We are looking for an experienced frontend developer...', companyId: companies[0]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[0]._id], locationId: locations[0]._id, salary: 25000000 },
      { title: 'Data Scientist', description: 'Join our data science team to work on exciting projects...', companyId: companies[1]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[1]._id], locationId: locations[1]._id, salary: 30000000 },
      { title: 'UI/UX Designer', description: 'Create stunning user interfaces and experiences...', companyId: companies[2]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[2]._id], locationId: locations[2]._id, salary: 22000000 },
      { title: 'Digital Marketing Specialist', description: 'Drive our online marketing efforts...', companyId: companies[3]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[3]._id], locationId: locations[3]._id, salary: 20000000 },
      { title: 'Sales Representative', description: 'Join our dynamic sales team...', companyId: companies[4]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[4]._id], locationId: locations[4]._id, salary: 18000000 },
      { title: 'Customer Service Representative', description: 'Provide excellent support to our customers...', companyId: companies[5]._id, jobTypeId: jobTypes[1]._id, categoryIds: [jobCategories[5]._id], locationId: locations[5]._id, salary: 15000000 },
      { title: 'Financial Analyst', description: 'Analyze financial data and provide insights...', companyId: companies[6]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[6]._id], locationId: locations[6]._id, salary: 28000000 },
      { title: 'HR Manager', description: 'Lead our human resources department...', companyId: companies[7]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[7]._id], locationId: locations[7]._id, salary: 35000000 },
      { title: 'Project Manager', description: 'Oversee and deliver successful projects...', companyId: companies[8]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[8]._id], locationId: locations[8]._id, salary: 32000000 },
      { title: 'Business Analyst', description: 'Analyze business processes and propose improvements...', companyId: companies[9]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[9]._id], locationId: locations[9]._id, salary: 26000000 },
      { title: 'Backend Developer', description: 'Develop robust backend systems...', companyId: companies[0]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[0]._id], locationId: locations[0]._id, salary: 27000000 },
      { title: 'Machine Learning Engineer', description: 'Apply machine learning techniques to solve complex problems...', companyId: companies[1]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[1]._id], locationId: locations[1]._id, salary: 35000000 },
      { title: 'Graphic Designer', description: 'Create visually appealing designs for various media...', companyId: companies[2]._id, jobTypeId: jobTypes[1]._id, categoryIds: [jobCategories[2]._id], locationId: locations[2]._id, salary: 20000000 },
      { title: 'SEO Specialist', description: 'Optimize our online presence and improve search rankings...', companyId: companies[3]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[3]._id], locationId: locations[3]._id, salary: 22000000 },
      { title: 'Account Manager', description: 'Manage key client relationships and drive sales growth...', companyId: companies[4]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[4]._id], locationId: locations[4]._id, salary: 24000000 },
      { title: 'Technical Support Specialist', description: 'Provide technical assistance to our customers...', companyId: companies[5]._id, jobTypeId: jobTypes[1]._id, categoryIds: [jobCategories[5]._id], locationId: locations[5]._id, salary: 18000000 },
      { title: 'Investment Analyst', description: 'Conduct investment research and make recommendations...', companyId: companies[6]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[6]._id], locationId: locations[6]._id, salary: 30000000 },
      { title: 'Talent Acquisition Specialist', description: 'Source and recruit top talent for our organization...', companyId: companies[7]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[7]._id], locationId: locations[7]._id, salary: 25000000 },
      { title: 'Scrum Master', description: 'Facilitate agile processes and remove obstacles for the team...', companyId: companies[8]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[8]._id], locationId: locations[8]._id, salary: 28000000 },
      { title: 'Data Analyst', description: 'Analyze complex datasets and provide actionable insights...', companyId: companies[9]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[9]._id], locationId: locations[9]._id, salary: 24000000 },
      { title: 'DevOps Engineer', description: 'Implement and maintain our CI/CD pipeline...', companyId: companies[0]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[0]._id], locationId: locations[0]._id, salary: 32000000 },
      { title: 'Data Engineer', description: 'Design and implement data pipelines and infrastructure...', companyId: companies[1]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[1]._id], locationId: locations[1]._id, salary: 33000000 },
      { title: 'Product Designer', description: 'Design intuitive and user-friendly products...', companyId: companies[2]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[2]._id], locationId: locations[2]._id, salary: 26000000 },
      { title: 'Content Marketing Manager', description: 'Develop and execute our content marketing strategy...', companyId: companies[3]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[3]._id], locationId: locations[3]._id, salary: 28000000 },
      { title: 'Sales Operations Analyst', description: 'Optimize sales processes and analyze performance metrics...', companyId: companies[4]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[4]._id], locationId: locations[4]._id, salary: 26000000 },
      { title: 'Customer Success Manager', description: 'Ensure customer satisfaction and drive retention...', companyId: companies[5]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[5]._id], locationId: locations[5]._id, salary: 27000000 },
      { title: 'Risk Analyst', description: 'Identify and assess financial risks...', companyId: companies[6]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[6]._id], locationId: locations[6]._id, salary: 29000000 },
      { title: 'Learning and Development Specialist', description: 'Design and implement employee training programs...', companyId: companies[7]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[7]._id], locationId: locations[7]._id, salary: 30000000 },
      { title: 'Product Owner', description: 'Define and prioritize product features...', companyId: companies[8]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[8]._id], locationId: locations[8]._id, salary: 31000000 },
      { title: 'Business Intelligence Analyst', description: 'Develop reports and dashboards to support decision-making...', companyId: companies[9]._id, jobTypeId: jobTypes[0]._id, categoryIds: [jobCategories[9]._id], locationId: locations[9]._id, salary: 27000000 }
    ]);
    console.log('Data seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}