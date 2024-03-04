import { Request, Response, NextFunction } from "express";
import Car, { CarDocument } from "../models/Car";
import Purchase, { PurchaseDocument } from "../models/Purchase";
import User, { UserDocument } from "../models/User";
import jwt from "jsonwebtoken";

export const viewAllCars = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Unauthorized: Missing token" });
    } else {
      const decodedToken = jwt.verify(token, "secret-key") as {
        id?: string;
        role?: string;
        username?: string;
      } | null;

      if (
        !decodedToken ||
        !decodedToken.id ||
        !decodedToken.role ||
        !decodedToken.username
      ) {
        res.status(401).json({ message: "Unauthorized: Invalid token format" });
      } else {
       
          const cars: CarDocument[] = await Car.find();
          res.status(200).json(cars);
    
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const purchaseCar = async (
 req: Request,
 res: Response,
 next: NextFunction
): Promise<void> => {
 try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Unauthorized: Missing token" });
    } else {
      const decodedToken = jwt.verify(token, "secret-key") as {
        id?: string;
        role?: string;
        username?: string;
      } | null;

      if (
        !decodedToken ||
        !decodedToken.id ||
        !decodedToken.role ||
        !decodedToken.username
      ) {
        res.status(401).json({ message: "Unauthorized: Invalid token format" });
      } else {
        const { carId, quantity } = req.body;

        const userId = decodedToken.id;

        const user: UserDocument | null = await User.findById(userId);
        const car: CarDocument | null = await Car.findById(carId);

        if (!user || !car) {
          res.status(404).json({ message: "User or car not found" });
        } else {
          if (car.quantity < quantity) {
            res
              .status(400)
              .json({ message: "Insufficient quantity available" });
          } else {
            const purchase: PurchaseDocument = new Purchase({
              user: userId,
              car: carId,
              quantity,
            });
            await purchase.save();

            car.quantity -= quantity;
            await car.save();

            res.status(200).json({ message: "Purchase successful" });
          }
        }
      }
    }
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
 }
};

export const viewMyPurchases = async (
 req: Request,
 res: Response,
 next: NextFunction
): Promise<void> => {
 try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Unauthorized: Missing token" });
    } else {
      const decodedToken = jwt.verify(token, "secret-key") as {
        id?: string;
        role?: string;
        username?: string;
      } | null;

      if (
        !decodedToken ||
        !decodedToken.id ||
        !decodedToken.role ||
        !decodedToken.username
      ) {
        res.status(401).json({ message: "Unauthorized: Invalid token format" });
      } else {
        const userId = decodedToken.id;

        const purchases: PurchaseDocument[] = await Purchase.find({
          user: userId,
        }).populate("car", "modelName brand quantity price").populate("user", "username role");

        const purchasesWithDetails = purchases.map(purchase => ({
          ...purchase.toObject(),
          user: {
            ...purchase.user,
          },
        }));

        res.status(200).json(purchasesWithDetails);
      }
    }
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
 }
};



