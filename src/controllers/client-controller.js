import models from '../models';

/**
 * Get Clients
 * GET '/'
 */
export const getClients = async (req, res) => {
  // Get clients
  const clients = await models.Client.find({});
  res.status(200).json(clients);
};

/**
 * Create Client
 * POST '/'
 */
export const createClient = async (req, res) => {
  // Get parameters
  const { name, monthly, email, timestamp } = req.body;
  // Create new client
  console.log(req.query);
  const newClient = new models.Client({
    name,
    monthly,
    email,
    timestamp,
  });
  // Save client
  await newClient.save();
  res.status(201).json({
    success: true,
    newClient,
  });
};

/**
 * Get Client
 * GET '/'
 */
export const getClient = async (req, res) => {
  // Get parameters
  const { cid } = req.params;
  // Get client and populate client transactions
  const client = await models.Client.findById(cid).populate('transactions');
  res.status(200).json(client);
};

/**
 * Update Client
 * PATCH '/'
 */
export const updateClient = async (req, res) => {
  // Get parameters
  const { cid } = req.params;
  const { name, email, timestamp, monthly } = req.body;
  const diff = {};
  // Get optional parameters
  if (name) diff.name = name;
  if (email) diff.email = email;
  if (timestamp) diff.timestamp = timestamp;
  if (monthly !== null) diff.monthly = monthly;
  // Update client
  const updatedClient = await models.Client.findByIdAndUpdate(cid, diff);
  res.status(200).json({
    success: true,
    updatedClient
  });
};

/**
 * Delete Client
 * DELETE '/'
 */
export const deleteClient = async (req, res) => {
  // Get parameters
  const { cid } = req.params;
  const deletedClient = await models.Client.findByIdAndRemove(cid);
  // Get client transactions
  const deletedTransactions = await models.Transaction.remove(
    { _id: { $in: deletedClient.transactions } }
  );
  res.status(200).json({
    success: true,
    deletedClient,
    deletedTransactions,
  });
};
