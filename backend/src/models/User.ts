import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  aboutMe?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  birthdate?: Date;
  currentStep: number; // 1, 2, or 3
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  aboutMe: {
    type: String,
    default: ''
  },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zip: { type: String, default: '' }
  },
  birthdate: {
    type: Date,
    default: null
  },
  currentStep: {
    type: Number,
    default: 1,
    min: 1,
    max: 3
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
