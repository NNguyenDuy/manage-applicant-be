import { locationController } from './location.controller';
import { I_Location } from './location.types';

export const locationResolvers = {
  Query: {
    getAllLocations: async (): Promise<I_Location[]> => {
      return await locationController.getAllLocations();
    },
    getLocation: async (_: any, { id }: { id: string }): Promise<I_Location | null> => {
      return await locationController.getLocation(id);
    },
  },
  Mutation: {
    createLocation: async (
      _: any,
      { address, city, country }: { address: string; city: string; country: string }
    ): Promise<{ message: string; data: I_Location | null }> => {
      return await locationController.createLocation({ address, city, country });
    },
    updateLocation: async (
      _: any,
      { id, address, city, country }: { id: string; address?: string; city?: string; country?: string }
    ): Promise<I_Location | null> => {
      return await locationController.updateLocation(id, { address, city, country });
    },
    deleteLocation: async (_: any, { id }: { id: string }): Promise<I_Location | null> => {
      return await locationController.deleteLocation(id);
    },
  },
};
