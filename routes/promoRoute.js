import { Router } from "express";
import { isAuthenticated } from "../services/common.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import multer from "multer";
import {
  createPromoController,
  getPromoController,
  updatePromoController,
  updatePromoImageController,
} from "../controllers/promoController.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/promo");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//Create Promo
router.post(
  "/admin/create-promo",
  isAuthenticated(),
  isAdmin,
  upload.fields([
    { name: "image_1", maxCount: 1 },
    { name: "image_2", maxCount: 1 },
    { name: "image_3", maxCount: 1 },
    { name: "image_4", maxCount: 1 },
    { name: "image_5", maxCount: 1 },
    { name: "image_6", maxCount: 1 },
    { name: "image_7", maxCount: 1 },
  ]),
  createPromoController
);

//Get Promo
router.get("/get-promo", getPromoController);

//Update Promo Image
router.put(
  "/admin/update-promo-image/:imageIndex",
  isAuthenticated(),
  isAdmin,
  upload.single("image"),
  updatePromoImageController
);

//Update Promo
router.put(
  "/admin/update-promo",
  isAuthenticated(),
  isAdmin,
  updatePromoController
);

export default router;
