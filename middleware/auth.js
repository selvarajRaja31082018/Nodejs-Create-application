const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
   // Extract the token from the Authorization header
   const token = req.header('Authorization')?.replace('Bearer ', '');

   // If no token is provided, return an error
   if (!token) return res.status(401).json({
      status: 1,
      message: 'Access Denied. No token provided.',
      data: null
   });

   try {
      // Verify the token using the secret key
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; // Attach the verified user data to the request
      next(); // Proceed to the next middleware or route handler
   } catch (error) {
      // Handle invalid token error
      res.status(400).json({
         status: 1,
         message: 'Invalid token',
         data: null
      });
   }
};

module.exports = auth;
