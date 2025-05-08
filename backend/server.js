import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import questionnaireRoutes from './routes/questionnaireRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import skillBuilderRoutes from './routes/skillBuilderRoutes.js';

import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/questionnaires', questionnaireRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/skill-builder', skillBuilderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});