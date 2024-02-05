


import Product from "../models/productModel.js";
// import Category from "../models/categoryModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

const createProduct = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    const {
      productName,
      price,
      image,
      color,
      fabric,
      size,
      quantity,
      userId,
    } = req.body;
    const imagePath = req.file ? req.file.path : '';

    if (!productName || !price || !color || !fabric || !size || !userId) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Please provide all required fields for the product",
      });
    }

    const newProduct = new Product({
      productName,
      price,
      image:imagePath,
      color,
      fabric,
      size,
      quantity,
      userId,
    });

    const savedProduct = await newProduct.save();
    const populatedProduct = await Product.findById(savedProduct._id)
      .populate("userryId");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      status: 201,
      data: populatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create a new product",
      status: 500,
      data: null,
    });
  }
};



const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('userId')
      .sort({ createdAt: -1 })
      .select("-__v"); // Exclude versioning field

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      status: 200,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      status: 500,
      data: null,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const product = await Product.findById(id)
    .populate('userId')
    .select("-__v");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      status: 200,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the requested product",
      status: 500,
      data: null,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      price,
      image,
      color,
      fabric,
      size,
      quantity,
      userId,
    } = req.body;
    const imagePath = req.file ? req.file.path : '';

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Not valid id format' });
    }

    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        status: 404,
        data: null,
      });
    }

   
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          productName,
          price,
          image:imagePath,
          color,
          fabric,
          size,
          quantity,
          userId,
        },
      },
      { new: true }
    )
      .populate('userId'); // Populate the updated category

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Failed to update product',
        status: 404,
        data: null,
      });
    }

   
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      status: 200,
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update the product',
      status: 500,
      data: null,
    });
  }
};

 
  const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
 
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Not valid id format" });
      }
 
      const deletedProduct = await Product.findByIdAndDelete(id);
 
      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
          status: 404,
          data: null,
        });
      }
 
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        status: 200,
        data: deletedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to delete the product",
        status: 500,
        data: null,
      });
    }
  };
 
  export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };

  
