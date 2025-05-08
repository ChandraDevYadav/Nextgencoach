import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  profileImage: String,
  notes: String,
});

const Client = mongoose.model('Client', ClientSchema);
export default Client;
