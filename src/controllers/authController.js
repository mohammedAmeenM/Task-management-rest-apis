const User = require('../models/authSchema');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// Create a new user----------------------
const createUser = async (req, res, next) => {
  try {
    const { email, password, ...otherData } = req.body;

    // Check if the email already exists----------------------
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "failure",
        message: "Email already in use",
      });
    }

    // Hash the password--------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance-----------------------
    const newUser = new User({ ...otherData, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "Successfully created user",
      data: newUser
    });
  } catch (error) {
    next(error);
  }
};

// Login user----------------------
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email-----------------------
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'failure',
        message: 'User not found'
      });
    }

    // Check the password--------------------
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: 'failure',
        message: 'Invalid password'
      });
    }

    // Generate token------------------------
    const token = generateToken(user._id);

    res.status(200).json({
      status: "success",
      message: "Login successfully",
      user,
      token
    });
  } catch (error) {
    next(error); 
  }
};

// gettt authenticated user-------------------------
const getAuthUser = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        status: "failure",
        message: "Bad request"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "failure",
        message: "User not found"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched user",
      user
    });
  } catch (error) {
    next(error); 
  }
};

module.exports = {
  createUser,
  loginUser,
  getAuthUser
};
