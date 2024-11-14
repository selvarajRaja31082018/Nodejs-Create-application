const express = require('express');
const { register, login, getUser, updateUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);

module.exports = router;
  