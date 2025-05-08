import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  avatar: {
    type: String
  },
  profession: {
    type: String
  },
  goals: {
    type: String
  },
  challenges: {
    type: String
  },
  notes: {
    type: String
  },
  sessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session'
  }],
  questionnaires: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questionnaire'
  }]
}, {
  timestamps: true
});

const Client = mongoose.model('Client', clientSchema);

export default Client;