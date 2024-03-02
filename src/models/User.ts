import mongoose, { Document, Model } from 'mongoose';

interface UserAttributes {
  username: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface UserDocument extends Document, UserAttributes {}

export interface UserModel extends Model<UserDocument> {}

const userSchema = new mongoose.Schema<UserDocument, UserModel>(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  {
    timestamps: true, // Add timestamps to the schema (createdAt and updatedAt)
  }
);

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
