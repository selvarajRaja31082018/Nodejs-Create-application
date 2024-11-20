const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Configure multer storage and validation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    return cb(new Error('Only .jpeg, .jpg, and .png files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // Limit to 1MB
  fileFilter: fileFilter
});

exports.createProduct = [
  upload.single('image'), // Handle the image upload
  async (req, res) => {
    try {
      const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        sku: req.body.sku,
        model: req.body.model,
        image: req.file ? `/uploads/${req.file.filename}` : null,
      };
      const product = await Product.create(productData);
      res.status(201).json({
        status: 0,
        message: 'Product created successfully',
        data: product,
      });
    } catch (error) {
      res.status(500).json({ status: 1, message: 'Server error', error });
    }
  },
];

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      status: 0,
      message: 'Products retrieved successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({ status: 1, message: 'Server error', error });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json({
        status: 0,
        message: 'Product retrieved successfully',
        data: product,
      });
    } else {
      res.status(404).json({ status: 1, message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 1, message: 'Server error', error });
  }
};

// Update a product
exports.updateProduct = [
  upload.single('image'), // Handle the image upload
  async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ status: 1, message: 'Product not found' });
      }

      const updatedData = {
        name: req.body.name || product.name,
        description: req.body.description || product.description,
        price: req.body.price || product.price,
        stock: req.body.stock || product.stock,
        sku: req.body.sku || product.sku,
        model: req.body.model || product.model,
        image: req.file ? `/uploads/${req.file.filename}` : product.image,
      };

      await product.update(updatedData);
      res.status(200).json({
        status: 0,
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error) {
      res.status(500).json({ status: 1, message: 'Server error', error });
    }
  },
];

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ status: 1, message: 'Product not found' });
    }

    await product.destroy();
    res.status(200).json({
      status: 0,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ status: 1, message: 'Server error', error });
  }
};
