import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { generateToken } from "../utils/generateToken";
import { addInventory } from "../services/userService";

dotenv.config();

const user = process.env.User;
const userPassword = process.env.password;

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;

    if (user !== username) {
      return res.status(401).json("User Doesn't Exist");
    }
    if (password !== userPassword) {
      return res.status(401).json("Wrong Credentials");
    }

    const token = await generateToken({ userId: user, role: "user" });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    return res.status(200).json("Login Success");
  } catch (error) {
    next(error);
  }
}
async function createInventory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, description, price, quantity } = req.body;
    const item = await addInventory(name, description, price, quantity);
    console.log(item);

    return res.status(200).json("Login Success");
  } catch (error) {
    next(error);
  }
}

export { login, createInventory };
