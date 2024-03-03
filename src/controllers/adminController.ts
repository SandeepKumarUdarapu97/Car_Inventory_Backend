import { Request, Response } from "express";
import Car, { CarDocument } from "../models/Car";
import Purchase, { PurchaseDocument } from "../models/Purchase";
import jwt from "jsonwebtoken";

export const viewAllCarsForAdmin = async (
  req: Request,
  res: Response
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
        // Check if the user has the admin role
        if (decodedToken.role !== "admin") {
          res
            .status(403)
            .json({ message: "Forbidden: Insufficient permissions" });
        } else {
          // If the user has the admin role, proceed with fetching all cars
          const cars: CarDocument[] = await Car.find();
          res.status(200).json(cars);
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addCar = async (req: Request, res: Response): Promise<void> => {
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
        // Check if the user has the admin role
        if (decodedToken.role !== "admin") {
          res
            .status(403)
            .json({ message: "Forbidden: Insufficient permissions" });
        } else {
          const { modelName, brand, quantity } = req.body;

          let car: CarDocument | null = await Car.findOne({ modelName });

          if (!car) {
            car = new Car({ modelName, brand, quantity });
          } else {
            car.quantity += quantity;
          }

          await car.save();

          res.status(201).json({ message: "Car added successfully" });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const viewAllPurchases = async (
  req: Request,
  res: Response
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
        // Check if the user has the admin role
        if (decodedToken.role !== "admin") {
          res
            .status(403)
            .json({ message: "Forbidden: Insufficient permissions" });
        } else {
          const purchases: PurchaseDocument[] = await Purchase.find()
            .populate("user", "username")
            .populate("car", "modelName");

          res.status(200).json(purchases);
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
