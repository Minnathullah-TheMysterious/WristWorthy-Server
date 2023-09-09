import {Router} from 'express'
import { createBrandController, getAllBrandsController } from '../controllers/brandController.js'

const router = Router()

//Create Brand
router.post('/create-brand', createBrandController)

//Get All Brands
router.get('/get-all-brands', getAllBrandsController)

export default router