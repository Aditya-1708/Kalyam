import express from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

import authenticate from "../middlewares/authenticate.js";

import authorize from "../middlewares/authorize.js";

import uploadProductImage from "../middlewares/uploadProductImage.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */
router.get("/", getProducts);

router.get("/:id", getProductById);

/**
 * ADMIN ROUTES
 */
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  uploadProductImage,
  createProduct
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  uploadProductImage,
  updateProduct
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteProduct
);

export default router;