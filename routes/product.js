const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const formidable = require('express-formidable')

router
  .post('/create-product', formidable(), productController.createProduct)
  .get('/all-products', productController.getAllProducts)
  .get('/product/:pid', productController.getProductById)
  .get('/products/:slug', productController.getProductBySlug)
  .get('/product-image/:pid', productController.getProductImage)
  .put('/update-product/:pid', productController.updateProduct)
  .delete('/delete-product/:pid', productController.deleteProduct)
  .get('/product-list/:page', productController.productList)
  .get('/product-count', productController.productCount)
  .post('/product-filters', productController.filterProduct)
  .get('/product-category/:slug', productController.getProductCategory)
  .get('/related-product', productController.getRelatedProducts)

exports.router = router;
