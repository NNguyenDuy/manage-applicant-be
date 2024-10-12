export interface AuthenticatedRequest extends Request {
  userId?: string
}

interface I_LocationInput {
  address: string
  city: string
  country: string
}

export interface I_CompanyInput {
  name: string
  location?: I_LocationInput
}
