const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');

// Protected routes for CRUD operations on products
router.post('/add', auth, createProduct);  // Create product
router.get('/', auth, getAllProducts);    // List all products
router.get('/:id', auth, getProductById); // View product by ID
router.put('/:id', auth, updateProduct);  // Update product by ID
router.delete('/:id', auth, deleteProduct); // Delete product by ID

module.exports = router;
