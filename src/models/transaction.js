import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    trim: true
  },
  price: {
    type: String,
    default: '0.00',
    trim: true
  },
  truck_types: {
    type: [String]
  },
  trailer_types: {
    type: [String]
  },
  truck_number: {
    type: Number
  },
  trailer_number: {
    type: Number
  },
  wash_out: {
    type: Boolean
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
});

// TODO: CHANGE CLIENT ID VALIDATION TO PRE-SAVE HOOK AFTER PRE VALIDATION IS MADE

/**
 * Client ID Validation
 * Ensures client exists
 */
TransactionSchema.pre('validate', async function (req, res, next) {
  // Get parameters
  const { client, isNew } = this; let err;
  // Determine if client is new
  if (isNew) {
    // Query for client
    const clientQuery = await this.model('Client').find({ _id: client });
    // Determine if client exists
    const isValid = Object.keys(clientQuery).length;
    if (!isValid) {
      err = new Error('Client does not exist'); err.status = 400;
    }
  }
  next(err);
});

export default mongoose.model('Transaction', TransactionSchema);
