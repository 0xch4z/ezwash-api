import * as models from '../models';

/**
 * Get Transactions
 * GET '/'
 */
export const getTransactions = async (req, res) => {
  // Get transactions
  const transactions = await models.Transaction.find({});
  res.status(200).json(transactions);
};

/**
 * Create Transaction
 * POST '/'
 */
export const createTransaction = async (req, res) => {
  // Get parameters
  const {
    cid,
    price,
    truck_types,
    trailer_types,
    truck_number,
    trailer_number,
    timestamp,
    wash_out,
  } = req.body;
  // Create new transaction
  const newTransaction = new models.Transaction({
    client: cid,
    price,
    truck_types,
    trailer_types,
    truck_number,
    trailer_number,
    timestamp,
    wash_out,
  });
  // Save new transaction
  await newTransaction.save();
  // Push to corresponding client's transaction array
  const updatedClient = await models.Client.findByIdAndUpdate(
    cid,
    { $push: { 'transactions': newTransaction._id } }
  );
  res.status(201).json({
    success: true,
    newTransaction,
    updatedClient
  });
};

/**
 * Get Transaction
 * GET '/:tid'
 */
export const getTransaction = async (req, res) => {
  // Get parameters
  const { tid } = req.params;
  // Get transaction
  const transaction = await models.Transaction.findById(tid);
  res.status(200).json(transaction);
};

/**
 * Update Transaction
 * PATCH '/:tid'
 */
export const updateTransaction = async (req, res) => {
  // Get parameters
  const { tid } = req.params;
  const {
    price,
    truck_types,
    trailer_types,
    truck_number,
    trailer_number,
    timestamp,
    wash_out,
  } = req.body;
  const diff = {};
  // Get optional parameters
  if (price) diff.price = price;
  if (truck_types) diff.truck_types = truck_types;
  if (trailer_types) diff.trailer_types = trailer_types;
  if (truck_number) diff.truck_number = truck_number;
  if (trailer_number) diff.trailer_number = trailer_number;
  if (timestamp) diff.timestamp = timestamp;
  if (wash_out !== null) diff.wash_out = wash_out;
  // Update transaction
  const updatedTransaction = await models.Transaction.findByIdAndUpdate(tid, diff);
  res.status(200).json({
    success: true,
    updatedTransaction,
  });
};

/**
 * Delete Transaction
 * DELETE ':/tid'
 */
export const deleteTransaction = async (req, res) => {
  // Get parameters
  const { tid } = req.params;
  // Delete transaction
  const deletedTransaction = await models.Transaction.findByIdAndRemove(tid);
  // Pull transaction from corresponding client's transaction array
  const updatedClient = await models.Client.findByIdAndUpdate(
    deletedTransaction.client,
    { $pull: { 'transactions': tid } }
  );
  res.status(200).json({
    success: true,
    deletedTransaction,
    updatedClient,
  });
};
