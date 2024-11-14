const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Departments',
      key: 'id',
    },
  },
  // Add more fields as needed
}, {
  tableName: 'Employees',
  timestamps: true,
});

module.exports = Employee;
