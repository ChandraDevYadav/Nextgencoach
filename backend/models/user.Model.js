import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isCoach: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: ''
  },
  coachingSpecialization: {
    type: String,
    default: ''
  },
  certification: {
    type: String,
    default: ''
  },
  yearsOfExperience: {
    type: Number,
    default: 0
  },
  clients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }],
  calendarIntegration: {
    googleCalendar: {
      isConnected: Boolean,
      accessToken: String,
      refreshToken: String
    }
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;