import { Router } from "express";
import multer from "multer";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  restoreCategoryController,
  updateCategoryController,
  updateCategoryImageController,
} from "../controllers/categoryController.js";
import { isAuthenticated } from "../services/common.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/category");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

//Create Category
router.post(
  "/admin/create-category",
  isAuthenticated(),
  isAdmin,
  upload.single("image"),
  createCategoryController
);

//Update Category Image
router.put(
  "/admin/update-category-image/:categoryId",
  isAuthenticated(),
  isAdmin,
  upload.single("image"),
  updateCategoryImageController
);

//Update Category
router.put(
  "/admin/update-category/:categoryId",
  isAuthenticated(),
  isAdmin,
  updateCategoryController
);

//Fetch All Categories
router.get("/get-all-categories", getAllCategoriesController);

//Delete Category
router.delete(
  "/admin/delete-category/:categoryId",
  isAuthenticated(),
  isAdmin,
  deleteCategoryController
);

//Restore Category
router.put(
  "/admin/restore-category/:categoryId",
  isAuthenticated(),
  isAdmin,
  restoreCategoryController
);

export default router;
