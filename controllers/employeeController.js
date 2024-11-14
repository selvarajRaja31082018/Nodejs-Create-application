


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');


// Insert a new employee
exports.createEmployee = async (req, res) => {
  const { name, departmentId } = req.body;
  try {
    const employee = await Employee.create({ name, departmentId });
    res.status(201).json({ status: 0, message: 'Employee created successfully', data: employee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ status: 1, message: 'Server error', error: error.message });
  }
};

// Update an existing employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, departmentId } = req.body;
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) return res.status(404).json({ status: 1, message: 'Employee not found' });

    employee.name = name;
    employee.departmentId = departmentId;
    await employee.save();
    res.status(200).json({ status: 0, message: 'Employee updated successfully', data: employee });
  } catch (error) {
    res.status(500).json({ status: 1, message: 'Server error' });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) return res.status(404).json({ status: 1, message: 'Employee not found' });

    await employee.destroy();
    res.status(200).json({ status: 0, message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 1, message: 'Server error' });
  }
};


exports.getAllEmployees = (req, res) => {
    res.send('All employees');
  };