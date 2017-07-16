import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 16,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    minLength: 8,
    maxLength: 100,
    trim: true
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    default: Date.now()
  }
});

export default mongoose.model('User', UserSchema);
