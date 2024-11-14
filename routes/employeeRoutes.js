const express = require('express');
const router = express.Router();

//const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');


const auth = require('../middleware/auth');

// Protected routes for CRUD operations
router.get('/', auth, getAllEmployees);
router.post('/add', auth, createEmployee);
router.put('/:id', auth, updateEmployee);
router.delete('/:id', auth, deleteEmployee);

module.exports = router;
