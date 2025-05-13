import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  zoomMeetingId: {
    type: String
  },
  zoomJoinUrl: {
    type: String
  },
  zoomStartUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  preSessionQuestionnaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questionnaire'
  },
  postSessionQuestionnaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questionnaire'
  },
  notes: {
    type: String
  },
  transcript: {
    type: String
  },
  aiSuggestions: [{
    timestamp: Date,
    suggestedQuestions: [String],
    focusThemes: [String],
    clientPatterns: [String]
  }],
  summary: {
    keyBreakthroughs: [String],
    topicsCovered: [String],
    clientCommitments: [String],
    reflectiveQuestions: [String]
  },
  feedback: {
    strengths: [String],
    missedOpportunities: [String],
    improvementSuggestions: [String],
    coachNotes: String
  }
}, {
  timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;