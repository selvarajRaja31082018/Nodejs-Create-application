const express = require('express');
const router = express.Router();
const { createDepartment, updateDepartment, deleteDepartment, getAllDepartments } = require('../controllers/departmentController');
const auth = require('../middleware/auth');

// Protected routes for CRUD operations
router.get('/list', auth, getAllDepartments);
router.post('/add', auth, createDepartment);
router.put('/:id', auth, updateDepartment);
router.delete('/:id', auth, deleteDepartment);

module.exports = router;
