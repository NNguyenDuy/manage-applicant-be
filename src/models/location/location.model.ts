import { Schema, model, Document } from 'mongoose';
import { I_Location } from './location.types';

export interface ILocationDocument extends I_Location, Document { }

const LocationSchema = new Schema<ILocationDocument>({
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

export const LocationModel = model<ILocationDocument>('Location', LocationSchema);
