import mongoose from 'mongoose';

interface Skill {
  name: string;
  experience: number;
}

interface Resume {
  cvLinks: string[];
  skills: Skill[];
}

export interface I_CandidateProfile {
  userId: mongoose.Types.ObjectId;
  resume: Resume;
  applications?: mongoose.Types.ObjectId[];
}
