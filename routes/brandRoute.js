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
import { isAuthenticated } from "../services/common.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/brand");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//Create Brand
router.post("/admin/create-brand", isAuthenticated(), isAdmin, upload.single("image"), createBrandController);

//Update Brand Image
router.put("/admin/update-brand-image/:brandId", isAuthenticated(),isAdmin, upload.single("image"), updateBrandImageController);

//Update Brand
router.put("/admin/update-brand/:brandId", isAuthenticated(), isAdmin, updateBrandController);

//Get All Brands
router.get("/get-all-brands", getAllBrandsController);

//Delete Brand
router.delete("/admin/delete-brand/:brandId", isAuthenticated(), isAdmin, deleteBranController);

//Restore Brand
router.put("/admin/restore-brand/:brandId", isAuthenticated(), isAdmin, restoreBrandsController);

export default router;
