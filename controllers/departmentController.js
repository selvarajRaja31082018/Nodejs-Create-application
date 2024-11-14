

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Department = require('../models/Department');



// Insert a new department
exports.createDepartment = async (req, res) => {
  const { name } = req.body;
  try {
    const department = await Department.create({ name });
    res.status(201).json({ status: 0, message: 'Department created successfully', data: department });
  } catch (error) {
    res.status(500).json({ status: 1, message: 'Server error' });
  }
};

// Update an existing department
exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const department = await Department.findByPk(id);
    if (!department) return res.status(404).json({ status: 1, message: 'Department not found' });

    department.name = name;
    await department.save();
    res.status(200).json({ status: 0, message: 'Department updated successfully', data: department });
  } catch (error) {
    res.status(500).json({ status: 1, message: 'Server error' });
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findByPk(id);
    if (!department) return res.status(404).json({ status: 1, message: 'Department not found' });

    await department.destroy();
    res.status(200).json({ status: 0, message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 1, message: 'Server error' });
  }
};


exports.getAllDepartments = (req, res) => {
    res.send('All employees');
  };