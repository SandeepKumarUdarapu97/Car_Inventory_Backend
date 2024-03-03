import { Request, Response } from 'express';
import User, { UserDocument } from '../models/User';
import jwt from 'jsonwebtoken';

const generateToken = (user: UserDocument): string => {
  return jwt.sign({ id: user._id, username: user.username, role: user.role }, 'secret-key', { expiresIn: '1h' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    console.log("userName : ",username,password);
    

    const user: UserDocument | null = await User.findOne({ username });
    console.log("userName : ",user);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
    }else {

    const passwordMatch: boolean = password === user.password;

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
    }else{
    const token: string = generateToken(user);
    res.status(200).json({ token, role: user.role });
    }
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const logout = (req: Request, res: Response): void => {
  // Implement logout logic (if needed)
  res.status(200).json({ message: 'Logout successful' });
};
