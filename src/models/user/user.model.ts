import { Schema, model, Document } from 'mongoose'
import { I_User, E_Role } from './user.types'
import bcrypt from 'bcrypt'

export interface IUserDocument extends I_User, Document {
  isModified: (path: string) => boolean
}

const UserSchema = new Schema<IUserDocument>({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(E_Role),
    default: E_Role.CANDIDATE,
  },
  candidateId: { type: Schema.Types.ObjectId, ref: 'CandidateProfile'},
  companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
  isDel: { type: Boolean, default: false },
})

UserSchema.pre('save', async function (next) {
  const user = this as IUserDocument
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
  next()
})

export const UserModel = model<IUserDocument>('User', UserSchema)
