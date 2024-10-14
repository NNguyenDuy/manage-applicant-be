export interface I_Skill {
  name: string
  experience: number
}

export interface I_Resume {
  cvLinks: string[]
  skills: I_Skill[]
}

export interface I_CandidateProfile {
  resume: I_Resume
  idDel?: boolean
}
