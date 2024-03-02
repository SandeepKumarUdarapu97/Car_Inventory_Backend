import express from 'express';
import { viewAllCars, addCar, viewAllPurchases } from '../controllers/adminController';
const router = express.Router();

router.get('/cars', viewAllCars);
router.post('/add-car', addCar);
router.get('/purchases', viewAllPurchases);

export default router;
