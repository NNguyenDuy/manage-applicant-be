import { I_Location } from './location.types'
import { LocationModel, ILocationDocument } from './location.model'

export const locationController = {
  getAllLocations: async (): Promise<I_Location[]> => {
    return await LocationModel.find()
  },

  getLocationById: async (id: string): Promise<ILocationDocument | null> => {
    return await LocationModel.findOne({ _id: id })
  },

  createLocation: async (location: I_Location): Promise<ILocationDocument> => {
    const newLocation = new LocationModel(location)
    return await newLocation.save()
  },

  updateLocation: async (
    id: string,
    location: Partial<I_Location>
  ): Promise<ILocationDocument | null> => {
    return await LocationModel.findByIdAndUpdate(id, location, { new: true })
  },

  deleteLocation: async (id: string): Promise<ILocationDocument | null> => {
    return await LocationModel.findByIdAndUpdate(
      id,
      { isDel: true },
      { new: true }
    )
  },
}
