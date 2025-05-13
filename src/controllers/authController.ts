import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "1d" });
};

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists manually (optional)
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email already present in the system" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({ token });
  } catch (err: any) {
    if (err.code === 11000 && err.keyValue.email) {
      return res
        .status(400)
        .json({ message: "Email already present in the system" });
    }

    res.status(500).json({ message: "Something went wrong" });
  }
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
