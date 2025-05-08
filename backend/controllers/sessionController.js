import asyncHandler from 'express-async-handler';
import Session from '../models/Session.js';
import Client from '../models/Client.js';
import Questionnaire from '../models/Questionnaire.js';
import { generateSessionSummary, generateCoachFeedback } from '../services/aiService.js';
import { sendSessionSummaryEmail } from '../services/emailService.js';
import { createZoomMeeting } from '../services/zoomService.js';

const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ user: req.user._id })
    .populate('client', 'name email')
    .sort({ date: -1 });
  res.json(sessions);
});

const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findOne({ 
    _id: req.params.id, 
    user: req.user._id 
  })
    .populate('client', 'name email')
    .populate('preSessionQuestionnaire')
    .populate('postSessionQuestionnaire');

  if (session) {
    res.json(session);
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

const createSession = asyncHandler(async (req, res) => {
  const { client, title, date, duration, preSessionQuestionnaire } = req.body;

  const clientExists = await Client.findOne({ _id: client, user: req.user._id });
  if (!clientExists) {
    res.status(400);
    throw new Error('Client not found');
  }

  if (preSessionQuestionnaire) {
    const questionnaireExists = await Questionnaire.findOne({ 
      _id: preSessionQuestionnaire, 
      user: req.user._id 
    });
    if (!questionnaireExists) {
      res.status(400);
      throw new Error('Questionnaire not found');
    }
  }

  const session = new Session({
    user: req.user._id,
    client,
    title,
    date,
    duration,
    preSessionQuestionnaire
  });

  if (process.env.ZOOM_ENABLED === 'true') {
    try {
      const zoomMeeting = await createZoomMeeting({
        topic: title,
        start_time: new Date(date).toISOString(),
        duration: duration,
        timezone: req.user.timezone || 'UTC'
      });

      session.zoomMeetingId = zoomMeeting.id;
      session.zoomJoinUrl = zoomMeeting.join_url;
      session.zoomStartUrl = zoomMeeting.start_url;
    } catch (error) {
      console.error('Failed to create Zoom meeting:', error);
    }
  }

  const createdSession = await session.save();
  res.status(201).json(createdSession);
});

const updateSession = asyncHandler(async (req, res) => {
  const { title, date, duration, status, notes, transcript } = req.body;

  const session = await Session.findOne({ 
    _id: req.params.id, 
    user: req.user._id 
  });

  if (session) {
    session.title = title || session.title;
    session.date = date || session.date;
    session.duration = duration || session.duration;
    session.status = status || session.status;
    session.notes = notes || session.notes;
    session.transcript = transcript || session.transcript;

    const updatedSession = await session.save();
    res.json(updatedSession);
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

const addAISuggestions = asyncHandler(async (req, res) => {
  const { suggestedQuestions, focusThemes, clientPatterns } = req.body;

  const session = await Session.findOne({ 
    _id: req.params.id, 
    user: req.user._id 
  });

  if (session) {
    session.aiSuggestions.push({
      timestamp: new Date(),
      suggestedQuestions,
      focusThemes,
      clientPatterns
    });

    const updatedSession = await session.save();
    res.json(updatedSession);
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

const generateSessionSummary = asyncHandler(async (req, res) => {
  const session = await Session.findOne({ 
    _id: req.params.id, 
    user: req.user._id 
  }).populate('client', 'name email');

  if (session) {
    if (session.status !== 'completed') {
      res.status(400);
      throw new Error('Session must be completed to generate summary');
    }

    try {
      const summary = await generateSessionSummary(session);
      session.summary = summary;
      await session.save();
      res.json({ summary });
    } catch (error) {
      res.status(500);
      throw new Error('Failed to generate session summary');
    }
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

const sendSessionSummary = asyncHandler(async (req, res) => {
  const session = await Session.findOne({ 
    _id: req.params.id, 
    user: req.user._id 
  }).populate('client', 'name email');

  if (session) {
    if (!session.summary) {
      res.status(400);
      throw new Error('Session summary not generated yet');
    }

    try {
      await sendSessionSummaryEmail(session, req.user);
      res.json({ message: 'Session summary sent successfully' });
    } catch (error) {
      res.status(500);
      throw new Error('Failed to send session summary email');
    }
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

const generateCoachFeedback = asyncHandler(async (req, res) => {
  const session = await Session.findOne({ 
    _id: req.params.id, 
    user: req.user._id 
  });

  if (session) {
    if (session.status !== 'completed') {
      res.status(400);
      throw new Error('Session must be completed to generate feedback');
    }

    try {
      const feedback = await generateCoachFeedback(session);
      session.feedback = feedback;
      await session.save();
      res.json({ feedback });
    } catch (error) {
      res.status(500);
      throw new Error('Failed to generate coach feedback');
    }
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

export {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  addAISuggestions,
  generateSessionSummary,
  sendSessionSummary,
  generateCoachFeedback
};