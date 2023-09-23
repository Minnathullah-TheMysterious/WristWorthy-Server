import { Router } from "express";
import multer from "multer";
import {
  createBrandController,
  deleteBranController,
  getAllBrandsController,
  restoreBrandsController,
  updateBrandController,
  updateBrandImageController,
} from "../controllers/brandController.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/brand/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//Create Brand
router.post("/create-brand", upload.single("image"), createBrandController);

//Update Brand Image
router.put("/update-brand-image/:brandId", upload.single("image"), updateBrandImageController);

//Update Brand
router.put("/update-brand/:brandId", updateBrandController);

//Get All Brands
router.get("/get-all-brands", getAllBrandsController);

//Delete Brand
router.delete("/delete-brand/:brandId", deleteBranController);

//Restore Brand
router.put("/restore-brand/:brandId", restoreBrandsController);

export default router;
