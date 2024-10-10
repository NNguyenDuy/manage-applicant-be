import { I_Location } from './location.types';
import { LocationModel } from './location.model';

export const locationController = {
  getAllLocations: async (): Promise<I_Location[]> => {
    return await LocationModel.find().exec();
  },

  getLocation: async (id: string): Promise<I_Location | null> => {
    return await LocationModel.findById(id).exec();
  },

  createLocation: async (
    location: I_Location
  ): Promise<{ message: string; data: I_Location | null }> => {
    const newLocation = new LocationModel(location);
    const savedLocation = await newLocation.save();

    return {
      message: 'Location created successfully.',
      data: savedLocation.toObject(),
    };
  },

  updateLocation: async (
    id: string,
    locationData: Partial<I_Location>
  ): Promise<I_Location | null> => {
    return await LocationModel.findByIdAndUpdate(id, locationData, { new: true }).exec();
  },

  deleteLocation: async (id: string): Promise<I_Location | null> => {
    return await LocationModel.findByIdAndDelete(id).exec();
  },
};
