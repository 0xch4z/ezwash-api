import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  price: { type: String, default: '0.00' },
  truck_types: { type: [String] },
  trailer_types: { type: [String] },
  truck_number: { type: Number },
  trailer_number: { type: Number },
  wash_out: { type: Boolean },
  timestamp: { type: Date, default: Date.now() },
});

export default mongoose.model('Transaction', TransactionSchema);
