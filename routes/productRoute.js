import { Router } from "express";
import multer from "multer";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getFilteredAndSortedProductsController,
  getSelectedProductController,
  restoreProductController,
  testProductRouteController,
  updateProductController,
} from "../controllers/productController.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/product/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//Create Product
router.post(
  "/create-product",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "image_1", maxCount: 1 },
    { name: "image_2", maxCount: 1 },
    { name: "image_3", maxCount: 1 },
    { name: "image_4", maxCount: 1 },
  ]),
  createProductController
);

//Update Product
router.put(
  "/update-product/:productId",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "image_1", maxCount: 1 },
    { name: "image_2", maxCount: 1 },
    { name: "image_3", maxCount: 1 },
    { name: "image_4", maxCount: 1 },
  ]),
  updateProductController
);

//Get All Products
router.get("/get-all-products", getAllProductsController);

//Get filtered Products
router.get("/get-filtered-products", getFilteredAndSortedProductsController);

//Get Selected Product
router.get("/get-selected-product/:productId", getSelectedProductController);

//Delete Product
router.delete('/delete-product/:productId', deleteProductController)

//Restore Product
router.put('/restore-product/:productId', restoreProductController)

//testing
router.get("/test", testProductRouteController);

export default router;
