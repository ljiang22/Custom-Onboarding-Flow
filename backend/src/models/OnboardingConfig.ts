import mongoose, { Document, Schema } from 'mongoose';

export interface IOnboardingConfig extends Document {
  page2Components: Array<{
    type: 'aboutMe' | 'address' | 'birthdate';
    order: number;
  }>;
  page3Components: Array<{
    type: 'aboutMe' | 'address' | 'birthdate';
    order: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const OnboardingConfigSchema: Schema = new Schema({
  page2Components: [{
    type: {
      type: String,
      enum: ['aboutMe', 'address', 'birthdate'],
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  }],
  page3Components: [{
    type: {
      type: String,
      enum: ['aboutMe', 'address', 'birthdate'],
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model<IOnboardingConfig>('OnboardingConfig', OnboardingConfigSchema);
