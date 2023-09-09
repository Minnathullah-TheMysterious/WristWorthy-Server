import { Router } from "express";
import multer from "multer";
import { createCategoryController, getAllCategoriesController } from "../controllers/categoryController.js";

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

//Fetch All Categories
router.get('/get-all-categories', getAllCategoriesController)

export default router;
