import { Request, Response } from 'express';
import Car, { CarDocument } from '../models/Car';
import Purchase, { PurchaseDocument } from '../models/Purchase';
import User, { UserDocument } from '../models/User';

export const viewAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars: CarDocument[] = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const purchaseCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, carId, quantity } = req.body;

    const user: UserDocument | null = await User.findById(userId);
    const car: CarDocument | null = await Car.findById(carId);

    if (!user || !car) {
      res.status(404).json({ message: 'User or car not found' });
    }else{

    if (car.quantity < quantity) {
      res.status(400).json({ message: 'Insufficient quantity available' });
    }else{

    const purchase: PurchaseDocument = new Purchase({ user: userId, car: carId, quantity });
    await purchase.save();

    car.quantity -= quantity;
    await car.save();

    res.status(201).json({ message: 'Purchase successful' });
    }
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const viewMyPurchases = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const purchases: PurchaseDocument[] = await Purchase.find({ user: userId }).populate('car', 'modelName');
    res.status(200).json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
