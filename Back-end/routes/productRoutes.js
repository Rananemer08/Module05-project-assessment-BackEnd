import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/uploadMiddleware.js";
import { authenticateToken } from "../middlewares/auth.js";
const router = express.Router();

// Create
router.post("/products",authenticateToken , upload.single("image"), createProduct);

// Get all
router.get("/products", getAllProducts);

// Get single
router.get("/products/:id", getProductById);

// Update
router.put("/products/:id",authenticateToken , upload.single("image"), updateProduct);

// Delete
router.delete("/products/:id", authenticateToken ,deleteProduct);


export default router;