const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const formidable = require('express-formidable')

router
  .post('/create-product', formidable(), productController.createProduct)
  .get('/all-products', productController.getAllProducts)
  .get('/product/:pid', productController.getProductById)
  .get('/products/:slug', productController.getProductBySlug)
  .get('/product-image/:pid', productController.getPrdoctImage)
  .put('/update-product/:pid', productController.updateProduct)
  .delete('/delete-product/:pid', productController.deleteProduct)

exports.router = router;
