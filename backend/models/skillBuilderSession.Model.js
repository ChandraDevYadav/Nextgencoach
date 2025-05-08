import mongoose from 'mongoose';

const skillBuilderSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  avatarSettings: {
    age: Number,
    gender: String,
    profession: String,
    emotion: String,
    goals: String
  },
  conversation: [{
    role: {
      type: String,
      enum: ['coach', 'client', 'system']
    },
    content: String,
    timestamp: Date
  }],
  feedback: {
    strengths: [String],
    areasForImprovement: [String],
    suggestedApproaches: [String],
    overallRating: Number
  },
  duration: {
    type: Number 
  }
}, {
  timestamps: true
});

const SkillBuilderSession = mongoose.model('SkillBuilderSession', skillBuilderSessionSchema);

export default SkillBuilderSession;