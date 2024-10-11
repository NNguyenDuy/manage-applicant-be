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
    // Seed Locations
    const locations = await LocationModel.insertMany([
      { address: '123 Nguyen Hue', city: 'Ho Chi Minh', country: 'Vietnam' },
      { address: '456 Le Loi', city: 'Ha Noi', country: 'Vietnam' },
      { address: '789 Tran Phu', city: 'Da Nang', country: 'Vietnam' },
    ]);

    // Seed Job Types
    const jobTypes = await JobTypeModel.insertMany([
      { type: 'Full-time' },
      { type: 'Part-time' },
      { type: 'Contract' },
      { type: 'Internship' },
    ]);

    // Seed Job Categories
    const jobCategories = await JobCategoryModel.insertMany([
      { name: 'Software Development' },
      { name: 'Data Science' },
      { name: 'Design' },
      { name: 'Marketing' },
    ]);

    // Seed Users
    const hashedPassword = await hashPassword('123123');
    const users = await UserModel.insertMany([
      { fullName: 'Admin User', email: 'admin@example.com', password: hashedPassword, role: E_Role.ADMIN },
      { fullName: 'Recruiter One', email: 'recruiter1@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Recruiter Two', email: 'recruiter2@example.com', password: hashedPassword, role: E_Role.RECRUITER },
      { fullName: 'Candidate One', email: 'candidate1@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
      { fullName: 'Candidate Two', email: 'candidate2@example.com', password: hashedPassword, role: E_Role.CANDIDATE },
    ]);

    // Seed Companies
    const companies = await CompanyModel.insertMany([
      { name: 'Tech Solutions', ownerId: users[1]._id, locationId: locations[0]._id },
      { name: 'Data Insights', ownerId: users[2]._id, locationId: locations[1]._id },
    ]);

    // Update Recruiter Users with Company
    await UserModel.updateMany(
      { _id: { $in: [users[1]._id, users[2]._id] } },
      { $set: { company: companies[0]._id } }
    );

    // Seed Candidate Profiles
    const candidateProfiles = await CandidateProfileModel.insertMany([
      {
        userId: users[3]._id,
        resume: {
          cvLinks: ['http://example.com/cv1.pdf'],
          skills: [{ name: 'JavaScript', experience: 3 }, { name: 'React', experience: 2 }]
        }
      },
      {
        userId: users[4]._id,
        resume: {
          cvLinks: ['http://example.com/cv2.pdf'],
          skills: [{ name: 'Python', experience: 4 }, { name: 'Machine Learning', experience: 2 }]
        }
      },
    ]);

    // Update Candidate Users with CandidateProfile
    await UserModel.updateMany(
      { _id: { $in: [users[3]._id, users[4]._id] } },
      { $set: { candidateProfile: candidateProfiles[0]._id } }
    );

    // Seed Jobs
    const jobs = await JobModel.insertMany([
      {
        title: 'Senior Frontend Developer',
        description: 'We are looking for an experienced frontend developer...',
        companyId: companies[0]._id,
        jobTypeId: jobTypes[0]._id,
        categoryIds: [jobCategories[0]._id],
        locationId: locations[0]._id,
      },
      {
        title: 'Data Scientist',
        description: 'Join our data science team to work on exciting projects...',
        companyId: companies[1]._id,
        jobTypeId: jobTypes[0]._id,
        categoryIds: [jobCategories[1]._id],
        locationId: locations[1]._id,
      },
      {
        title: 'UI/UX Design Intern',
        description: 'Great opportunity for aspiring designers to gain experience...',
        companyId: companies[0]._id,
        jobTypeId: jobTypes[3]._id,
        categoryIds: [jobCategories[2]._id],
        locationId: locations[2]._id,
      },
    ]);

    // Update Companies with Jobs
    await CompanyModel.updateMany(
      { _id: { $in: companies.map(c => c._id) } },
      { $push: { jobs: { $each: jobs.map(j => j._id) } } }
    );

    // Seed Applications
    await ApplicationModel.insertMany([
      {
        jobId: jobs[0]._id,
        candidateProfileId: candidateProfiles[0]._id,
        status: E_ApplicationStatus.SUBMITTED,
        appliedAt: new Date(),
      },
      {
        jobId: jobs[1]._id,
        candidateProfileId: candidateProfiles[1]._id,
        status: E_ApplicationStatus.UNDER_REVIEW,
        appliedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
    ]);

    // Update CandidateProfiles with Applications
    await CandidateProfileModel.updateMany(
      { _id: { $in: candidateProfiles.map(cp => cp._id) } },
      { $push: { applications: { $each: jobs.map(j => j._id) } } }
    );

    // Update Jobs with Candidates
    await JobModel.updateMany(
      { _id: { $in: jobs.map(j => j._id) } },
      { $push: { candidates: { $each: candidateProfiles.map(cp => cp._id) } } }
    );

    console.log('Data seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}