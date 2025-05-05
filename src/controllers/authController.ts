import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "1d" });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  const user = (await User.create({ name, email, password })) as {
    _id: string;
    role: string;
  };
  const token = generateToken(user._id.toString(), user.role);
  res.status(201).json({ token });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = (await User.findOne({ email })) as {
    _id: string;
    role: string;
    comparePassword: (password: string) => Promise<boolean>;
  };
  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user._id.toString(), user.role);
  res.json({ token });
};
