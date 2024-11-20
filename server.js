// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes'); // Add if needed
const productRouter = require('./routes/productRoutes');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);  // Register the employee routes
app.use('/api/department', departmentRoutes);
app.use('/uploads', express.static('uploads')); // Serve images statically
app.use('/api/product', productRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

const sequelize = require('./config/database');

// Sync database with sequelize
sequelize.sync().then(() => {
    console.log('Database connected and tables synced');
}).catch(error => console.log('Error syncing with database:', error));
