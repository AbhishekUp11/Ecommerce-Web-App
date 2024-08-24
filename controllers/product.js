const res = require('express/lib/response');
const product = require('../models/product');
const Product = product.Product;
const fs = require('fs');
const slugify = require('slugify')

exports.createProduct = async (req, res) => {
  try{
    const {name, description, price, category, quantity, shipping} = req.fields;
    const {photo} = req.files;
    switch(true){
        case !name:
          return res.status(300).send({
                message: "Name is required"
              })
        case !price:
          return res.status(300).send({
              message: "Name is required"
            })
        case !description:
          return res.status(300).send({
              message: "Description is required"
            })
        case !category:
          return res.status(300).send({
              message: "Category is required"
            })
        case !quantity:
          return res.status(300).send({
            message: 'Quantity is required'
          })
        case photo && photo.size < 10000:
          return res.status(300).send({
              message: "Photo is required"
            })
    }
    const products = new Product({ ...req.fields, slug: slugify(name) });
    if(photo){
      products.image.data = fs.readFileSync(photo.path);
      products.image.contentType = photo.type;
    }
    await products.save();
    res.status(202).send({
      success: true,
      message: "Product saved successfully",
      products
    })

  } catch(error){
    console.log(error)
    res.status(500).send({
        success: false,
        message: "Something went wrong",
        error
    })
  }
};

exports.getAllProducts = async (req, res) => {
  try{
    const products = await Product.find({}).populate("category").select("-image").limit(12).sort({createdAt: -1});
    res.status(202).send({
      success: true,
      message: "Prducts fetched",
      products,
      total: products.length
    })

  }catch(error){
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error
    })
  }
};

exports.getProductById = async (req, res) => {
  try{
    const id = req.params.pid;
    const product = await Product.findOne({_id: id}).select("-image");
    res.status(200).send({
      success: true,
      message: "Product fetched",
      product
    });
  }catch(error){
    console.log(error)
    res.status(500).send("Something Went Wrong!"),
    error
  }
};

exports.getProductBySlug = async (req, res) => {
  try{
    const slug = req.params.slug;
    const product = await Product.findOne({slug}).populate("category").select("-image");
    res.status(202).send({
      success: true,
      message: "Product Fetched Successfully",
      product
    });
  }catch(error){
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error
    })
  }
};

exports.deleteProduct = async (req, res) => {
  try{
    const id = req.params.pid;
    const product = await Product.findByIdAndDelete({_id: id});
    res.status(202).send({
      success: true,
      message: "Product deleted Successfully!",
      product
    })

  }catch(error){
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Something Went Wrong!",
      error
    })
  }
};

exports.getProductImage = async (req, res) => {
  try{
    const id = req.params.pid;
    const product = await Product.findById({_id: id}).select("image");
    console.log("product", product.image)
    if(product.image.data){
      res.set('Content-type', product.image.contentType)
      res.status(202).send(
        product.image.data
      )
    }

  }catch(error){
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Something Went wrong",
      error
    })
  }
};

exports.updateProduct = async (req, res) => {
  try{
    const id = req.params.pid
    const {name, slug, description, price, category, quantity, shipping} = req.fields;
    const {image} = req.files;
    switch(true){
        case !name:
          return res.status(300).send({
                message: "Name is required"
              })
        case !price:
          return res.status(300).send({
              message: "Name is required"
            })
        case !description:
          return res.status(300).send({
              message: "Description is required"
            })
        case !category:
          return res.status(300).send({
              message: "Category is required"
            })
        case image && image.size < 10000:
          return res.status(300).send({
              message: "Photo is required"
            })
    }
    const products = Product.findByIdAndUpdate(id, {...req.fields, slug: slugify(name)}, {new: true})
    if(image){
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();
    res.status(202).send({
      success: true,
      message: "Product saved successfully",
      products
    })

  }catch(error){
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error
    })
  }
};

exports.productList = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

exports.productCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

exports.filterProduct = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};
