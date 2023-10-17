import { Router } from "express";
import multer from "multer";
import {
  SearchProductController,
  createProductController,
  deleteProductController,
  getFilteredAndSortedProductsController,
  getRelatedProductController,
  getSelectedProductController,
  restoreProductController,
  testProductRouteController,
  updateProductController,
  updateProductImageController,
  updateProductStockController,
  updateProductThumbnailController,
} from "../controllers/productController.js";
import { isAuthenticated } from "../services/common.js";
import {isAdmin} from '../middlewares/authMiddleware.js'

const router = Router();

//TODO: Change the path to 'public/images/product'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/product");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//Create Product
router.post(
  "/admin/create-product",
  isAuthenticated(),
  isAdmin,
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
  "/admin/update-product/:productId",
  isAuthenticated(),
  isAdmin,
  updateProductController
);

//Update Product Thumbnail
router.put(
  "/admin/update-product-thumbnail/:productId",
  isAuthenticated(),
  isAdmin,
  upload.single("thumbnail"),
  updateProductThumbnailController
);

//Update product image
router.put(
  "/admin/update-product-image/:productId/:imageIndex",
  isAuthenticated(),
  isAdmin,
  upload.single("image"),
  updateProductImageController
);

//Get all or filtered Products
router.get("/get-filtered-products", getFilteredAndSortedProductsController);

//Get Product By Id
router.get("/get-selected-product/:productId", getSelectedProductController);

//Get Related Products By Category & productId
router.get("/get-related-products/:categoryId/:productId", getRelatedProductController);

//Search Products By name
router.get("/search-product/:productName", SearchProductController);

//Delete Product
router.delete(
  "/admin/delete-product/:productId",
  isAuthenticated(),
  isAdmin,
  deleteProductController
);

//Restore Product
router.put(
  "/admin/restore-product/:productId",
  isAuthenticated(),
  isAdmin,
  restoreProductController
);

//Update Product Stock
router.put(
  "/user/update-product-stock/:productId/:productQuantity",
  isAuthenticated(),
  updateProductStockController
);

//testing
router.get("/test", testProductRouteController);

export default router;
