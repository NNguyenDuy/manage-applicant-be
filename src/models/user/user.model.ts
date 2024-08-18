import { I_User } from './user.types'
import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUserDocument extends I_User, Document {
  isModified: (path: string) => boolean
}

const UserSchema = new Schema<IUserDocument>({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'recruiter', 'candidate'],
    required: true,
  },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
  profileId: { type: Schema.Types.ObjectId, ref: 'CandidateProfile' },
})

UserSchema.pre('save', async function (next) {
  const user = this as IUserDocument
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
  next()
})

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema)
