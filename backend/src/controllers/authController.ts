import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

const signToken = (userId: string): string =>
  jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });

export const register = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, username, firstName, lastName, password } = req.body;

  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    const field = existing.email === email ? "email" : "username";
    res.status(409).json({ message: `This ${field} is already taken` });
    return;
  }

  const user = await User.create({
    email,
    username,
    firstName,
    lastName,
    password,
    provider: "local",
  });

  const token = signToken(String(user._id));

  res.status(201).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      preferredLanguage: user.preferredLanguage,
    },
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  const token = signToken(String(user._id));

  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      preferredLanguage: user.preferredLanguage,
    },
  });
};

export const logout = (_req: Request, res: Response): void => {
  res.json({ message: "Logged out successfully" });
};

export const me = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({
    id: user._id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture,
    preferredLanguage: user.preferredLanguage,
  });
};
