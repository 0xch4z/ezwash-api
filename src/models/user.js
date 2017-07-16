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

/**
 * Username and email collision validator
 * Ensures username and email are not duplicated
 */
UserSchema.pre('save', async function (next) {
  // Get parameters
  const { isNew, userName, email } = this; let err;
  // Determine if client is new
  const expected = isNew ? 0 : 1;
  // Query for username and email collisions
  const userNameQuery = await this.model('User').find({ userName });
  const emailQuery = await this.model('User').find({ email });
  // Determine if there are collisions
  const validUserName = Object.keys(userNameQuery).length <= expected;
  const validEmail = Object.keys(emailQuery).length <= expected;
  console.log(validUserName, validEmail);
  if (!validUserName && !validEmail) {
    err = new Error('Username and email are already in use'); err.status = 400;
  } else if (!validUserName) {
    err = new Error('Username is already in use'); err.status = 400;
  } else if (!validEmail) {
    err = new Error('Email is already in use'); err.status = 400;
  }
  next(err);
});

export default mongoose.model('User', UserSchema);
