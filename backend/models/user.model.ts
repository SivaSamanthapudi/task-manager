import bcrypt from 'bcryptjs';
import mongoose, { Schema, Document } from 'mongoose';
import { USER } from './constants.model';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  password?: string;
  roles: string[];
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  roles: { type: [String], default: ['USER'] },
});


userSchema.pre('save', async function (this: IUser) {
  // If password isn't modified, skip hashing
  if (!this.isModified('password')) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    if (this.password) {
      this.password = await bcrypt.hash(this.password, salt);
    }
    // No need to call next() here
  } catch (err: any) {
    // Re-throw the error; Mongoose will catch it and stop the save
    throw err;
  }
});

export const User =mongoose.model<IUser>(USER, userSchema);