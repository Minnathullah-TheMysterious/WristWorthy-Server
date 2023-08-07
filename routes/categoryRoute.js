import { Router } from "express";
import { createCategoryController } from "../controllers/categoryController.js";

const router = Router()

//Create Category
router.post('/create-category', createCategoryController)

export default router