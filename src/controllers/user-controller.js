import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import models from '../models';

/**
 * Get Users
 * GET '/'
 */
export const getUsers = async(req, res) => {
  // get users
  const users = await models.User.find({});
  res.status(200).json(users);
};

/**
 * Create User
 * POST '/'
 */
export const createUser = async (req, res) => {
  // Get parameters
  const {
    userName,
    passWord,
    name,
    email
  } = req.body;
  // Generate salt and hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(passWord, salt);
  // Create new user entry
  const newUser = new models.User({
    userName,
    hash,
    salt,
    name,
    email
  });
  // Save user entry
  await newUser.save();
  res.status(201).json(newUser);
};

/**
 * Get User
 * DELETE '/:uid'
 */
export const getUser = async (req, res) => {
  // Get params
  const { uid } = req.params;
  // Get user
  const user = await models.User.findById(uid);
  res.status(200).json(user);
}

/**
 * Update User
 * PATCH '/:uid'
 */
export const updateUser = async (req, res) => {
  // Get params
  const { uid } = req.params;
  const {
    userName,
    passWord,
    name,
    email
  } = req.body;
  // Get optional params
  const diff = {};
  if (userName) diff.userName = userName;
  if (name) diff.name = name;
  if (email) diff.email = email;
  // Generate salt and hash
  if (passWord) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passWord, salt);
    diff.salt = salt; diff.hash = hash;
  }
  // Update user
  const updatedUser = await models.User.findByIdAndUpdate(uid, diff);
  res.status(200).json({
    success: true,
    updatedUser
  })
};

/**
 * Delete User
 * DELETE '/:uid'
 */
export const deleteUser = async (req, res) => {
  // Get params
  const { uid } = req.params;
  // Delete user
  const deletedUser = await models.User.findByIdAndRemove(uid);
  res.status(201).json({
    success: true,
    deletedUser
  });
};

/**
 * Authenticate User
 * POST '/'
 */
export const authenticateUser = async (req, res) => {
  // Get params
  const { userName, passWord } = req.body;
  // Get user account
  const user = await models.User.findOne({ userName });
  // Compare hashes
  const success = await bcrypt.compare(passWord, user.hash);
  // TODO: implement token serving
  res.status(200).json({
    success,
    token: null
  });
};
