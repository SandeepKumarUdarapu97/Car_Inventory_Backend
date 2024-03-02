import { Request, Response } from 'express';
import Car, { CarDocument } from '../models/Car';
import Purchase, { PurchaseDocument } from '../models/Purchase';

export const viewAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars: CarDocument[] = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { modelName, brand, quantity } = req.body;

    let car: CarDocument | null = await Car.findOne({ modelName });

    if (!car) {
      car = new Car({ modelName, brand, quantity });
    } else {
      car.quantity += quantity;
    }

    await car.save();

    res.status(201).json({ message: 'Car added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const viewAllPurchases = async (req: Request, res: Response): Promise<void> => {
  try {
    const purchases: PurchaseDocument[] = await Purchase.find().populate('user', 'username').populate('car', 'modelName');
    res.status(200).json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
