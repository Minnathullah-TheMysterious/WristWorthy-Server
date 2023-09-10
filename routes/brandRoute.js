import {Router} from 'express'
import multer from "multer";
import { createBrandController, getAllBrandsController } from '../controllers/brandController.js'

const router = Router()

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
router.post('/create-brand', upload.single('image'), createBrandController)

//Get All Brands
router.get('/get-all-brands', getAllBrandsController)

export default router