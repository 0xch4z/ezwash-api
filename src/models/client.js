import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  monthly: { type: Boolean, required: true },
  email: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  }],
});

export default mongoose.model('Client', ClientSchema);
