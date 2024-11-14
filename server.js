const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


const userRoutes = require('./routes/userRoutes');





dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});


const sequelize = require('./config/database');

sequelize.sync().then(() => {
 // console.log('MySQL database connected and tables created if not existing');
}).catch(error => console.log('Error syncing with database:', error));
