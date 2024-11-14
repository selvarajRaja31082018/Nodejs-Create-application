const Sequelize = require('sequelize');

const sequelize = new Sequelize('basic_node_api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
module.exports = sequelize;



