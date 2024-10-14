import { locationController } from './location.controller'
import { I_Location } from './location.types'

export const locationResolvers = {
  Query: {
    getAllLocations: async (): Promise<I_Location[]> => {
      return await locationController.getAllLocations()
    },
    getLocationById: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_Location | null> => {
      return await locationController.getLocationById(id)
    },
  },
  Mutation: {
    createLocation: async (
      _: any,
      { location }: { location: I_Location }
    ): Promise<I_Location> => {
      return await locationController.createLocation(location)
    },
    updateLocation: async (
      _: any,
      { id, location }: { id: string; location: Partial<I_Location> }
    ): Promise<I_Location | null> => {
      return await locationController.updateLocation(id, location)
    },
    deleteLocation: async (
      _: any,
      { id }: { id: string }
    ): Promise<I_Location | null> => {
      return await locationController.deleteLocation(id)
    },
  },
}
