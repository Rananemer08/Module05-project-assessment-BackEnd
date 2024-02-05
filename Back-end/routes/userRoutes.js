// Import the controllers
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  } from "../controllers/userController.js";
  
  // Assuming you are using Express.js for your routes
  import express from "express";
  import { authenticateToken } from "../middlewares/auth.js";
  const router = express.Router();
  
  // Define your routes and use the controllers
  router.get("/users",authenticateToken , getAllUsers);
  router.get("/users/:id",authenticateToken, getUserById);
  router.put("/users/:id",authenticateToken , updateUser);
  router.delete("/users/:id",authenticateToken , deleteUser);
  
  // Export the router to be used in your main application file
  export default router;
  