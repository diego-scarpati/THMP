import User from "../models/User.js";
import { IUser } from "../utils/types.js";
import bcrypt from "bcrypt";

export const createUser = async (userData: IUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  try {
    const user = await User.create({ ...userData, password: hashedPassword });
    const { password, ...userWithoutPassword } = user.dataValues;
    return userWithoutPassword;
  } catch (error) {
    console.error("Error creating User:", error);
    throw error;
  }
};

export const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.dataValues.password))) {
    throw new Error("Invalid credentials");
  }

  return user.get({ plain: true });
};
