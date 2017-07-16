import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true
  },
  monthly: {
    type: Boolean,
    required: true
  },
  email: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    }
  ],
});

export default mongoose.model('Client', ClientSchema);
