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

/**
 * Name and email collision validator
 * Ensures there are no duplicate names or emails
 */
ClientSchema.pre('save', async function (next) {
  // Get parameters
  const { name, email, isNew } = this; let err;
  // Determine if client entry is new
  const expected = isNew ? 0 : 1;
  // Query for name and email
  const nameQuery = await this.model('Client').find({ name });
  const emailQuery = await this.model('Client').find({ email });
  // Determine if there are any collisions
  const validName = Object.keys(nameQuery).length <= expected;
  const validEmail = Object.keys(emailQuery).length <= expected;
  if (!validName && !validEmail) {
    err = new Error('Name and email are already in use'); err.status = 400;
  } else if (!validName) {
    err = new Error('Name is already in use'); err.status = 400;
  } else if (!validEmail) {
    err = new Error('Email is already in use'); err.status = 400;
  }
  next(err);
});

export default mongoose.model('Client', ClientSchema);
