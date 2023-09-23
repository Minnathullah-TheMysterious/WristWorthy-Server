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

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/category/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

//Create Category
router.post(
  "/create-category",
  upload.single("image"),
  createCategoryController
);

//Update Category Image
router.put(
  "/update-category-image/:categoryId",
  upload.single("image"),
  updateCategoryImageController
);

//Update Category
router.put("/update-category/:categoryId", updateCategoryController);

//Fetch All Categories
router.get("/get-all-categories", getAllCategoriesController);

//Delete Category
router.delete("/delete-category/:categoryId", deleteCategoryController);

//Restore Category
router.put("/restore-category/:categoryId", restoreCategoryController);

export default router;
