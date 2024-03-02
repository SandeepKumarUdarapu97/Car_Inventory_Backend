import express from 'express';
import { viewAllCars, purchaseCar, viewMyPurchases } from '../controllers/userController';
const router = express.Router();

router.get('/cars', viewAllCars);
router.post('/purchase', purchaseCar);
router.get('/my-purchases', viewMyPurchases);

export default router;
