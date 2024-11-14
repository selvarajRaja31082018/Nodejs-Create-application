const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
// Register a new user
exports.register = async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      // Check if user exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({
          status: 1,
          message: 'User already exists',
        });
      }
  
      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword, email });
  
      // Generate JWT token
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        status: 0,
        message: 'User registered successfully',
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 1,
        message: 'Server error',
      });
    }
  };

// Login user and provide JWT

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({
          status: 1,
          message: 'Invalid credentials',
        });
      }
  
      // Compare password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: 1,
          message: 'Invalid credentials',
        });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Return token with 'Bearer' prefix
      res.status(200).json({
        status: 0,
        message: 'Login successful',
        token: `Bearer ${token}`,  // Add 'Bearer ' prefix to the token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 1,
        message: 'Server error',
      });
    }
  };

  exports.getUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({
          status: 1,
          message: 'User not found',
          data: null
        });
      }
  
      res.status(200).json({
        status: 0,
        message: 'User found',
        data: {
          id: user.id,
          username: user.username
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 1,
        message: 'Server error',
        data: null
      });
    }
  };
  

// Update user info (Protected route)

exports.updateUser = async (req, res) => {
    try {
      // Find the user by their ID (from the decoded token)
      const user = await User.findByPk(req.user.id);
  
      // If user not found, return an error response
      if (!user) {
        return res.status(404).json({
          status: 1,
          message: 'User not found',
          data: null
        });
      }
  
      // Destructure username and password from the request body
      const { username, password } = req.body;
  
      // Update the user's username and password if provided
      user.username = username || user.username;
      user.password = password ? await bcrypt.hash(password, 10) : user.password;
  
      // Save the updated user to the database
      await user.save();
  
      // Return a success response
      res.status(200).json({
        status: 0,
        message: 'User updated successfully',
        data: {
          id: user.id,
          username: user.username
        }
      });
    } catch (error) {
      // Log error and return a server error response
      console.error(error);
      res.status(500).json({
        status: 1,
        message: 'Server error',
        data: null
      });
    }
  };
  