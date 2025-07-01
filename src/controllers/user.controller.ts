import { Request, Response } from "express";
import * as userService from "../services/user.services.js";
import { IUser } from "../utils/types.js";
import { generateToken } from "../utils/jwt.js";

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userService.authenticateUser(email, password);
    const token = generateToken(user.id, user.email);

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (err) {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
