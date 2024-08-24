const category = require("../models/category");
const Category = category.Category;
const slugify = require('slugify');
const mongoose = require('mongoose');

exports.createCategory = async (req, res) => {
  try {
    const name = req.body;
    if (!name) {
      res.status(401).send({
        message: "Category Name is mondatory",
      });
    }
    const existingCategory = Category.findOne({name});
    if (existingCategory.name) {
      res.status(401).send({
        message: "Category Already Exist!",
      });
    }
    const newCategory = new Category(req.body)
		console.log("newCategory", newCategory)
		try{
			await newCategory.save()
			res.status(200).send({
				success: true,
				message: "Category created successfully",
				category: newCategory
			})
		}catch(err){
			console.log("error", err)
			res.status(402).send({
				success: false,
				message: "Error in creating Category",
				error: err
			})
		}
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

exports.updateCategory = async (req, res) => {
	try{
		const {name} = req.body;
		const {id} = req.params;
		const category = await Category.findByIdAndUpdate(id, {name}, {new: true});
		res.status(200).send({
			success: true,
			message: "Category updated successfully",
			category
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

exports.getAllCategories = async (req, res) => {
  try{
	  const categories = await Category.find();
      res.status(200).send({
			success: true,
			message: "All Categies List",
			categories
	   })

	}catch(err){
		res.status(500).send({
			success: false,
			message: "Something went wrong",
			err
		})
	}
};

// get category by id
exports.getCategoryById = async (req, res) => {
  try{
		const {id} = req.params;
		const category = await Category.findById({_id: id});
		res.status(200).send({
			success: true,
			message: "Category fetched",
			category
		})

	}catch(err){
		console.log(err)
		res.status(200).send({
			success: false,
			message: "Something went wrong",
			err
		})
	}
};

// delete category by id
exports.deleteCategory = async (req, res) => {
  try{
		const id = req.params;
		await Category.findByIdAndDelete(id);
		res.status(200).send({
			success: true,
			message: "Category deleted Successfully",
			category
		})
    
	}catch(err){
    res.status(500).send({
			success: true,
			message: "something went wrong",
			err
		})
	}
}
