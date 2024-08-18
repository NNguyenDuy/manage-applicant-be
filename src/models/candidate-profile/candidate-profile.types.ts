export interface I_CandidateProfile {
  skills: string[]
  experience:
    | 'Under 1 Year'
    | '1-2 Years'
    | '2-3 Years'
    | '3-4 Years'
    | 'Over 5 years'
  cvUrl?: string[]
}
