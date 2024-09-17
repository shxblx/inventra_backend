import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { generateToken } from "../utils/generateToken";
import {
  addInventory,
  checkExist,
  deleteItem,
  fetchItems,
  updateItem,
} from "../services/itemService";

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
    console.log(req.body);

    const { name, description, price, quantity, unit } = req.body;
    const exist = await checkExist(name);
    if (exist) {
      return res.status(409).json("Item already exist");
    }
    const item = await addInventory(name, description, price, quantity, unit);
    if (item) {
      return res.status(200).json("Item added successfully");
    }
    return res.status(400).json("Something went wrong");
  } catch (error) {
    next(error);
  }
}
async function getInventoryItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = req.params.page as unknown as number;

    const searchTerm = req.query.search as string;
    const item = await fetchItems(searchTerm, page);
    if (item) {
      return res.status(200).json(item);
    } else {
      return res.status(204).json("No Items Found");
    }
  } catch (error) {
    next(error);
  }
}

async function updateInventory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, description, price, quantity, unit } = req.body.updatedItem;
    const { _id } = req.body;

    let exist;

    if (name) {
      exist = await checkExist(name, _id);
    }

    if (exist) {
      return res.status(409).json("Name already exists");
    }

    const item = await updateItem(
      _id,
      name,
      description,
      price,
      quantity,
      unit
    );
    if (item) {
      return res.status(200).json("Item updated successfully");
    }
    return res.status(400).json("Something went wrong");
  } catch (error) {
    next(error);
  }
}

async function deleteInventory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.body;
    const item = await deleteItem(id);
    if (item) {
      return res.status(200).json("Item deleted successfully");
    }
    return res.status(400).json("Something went wrong");
  } catch (error) {
    next(error);
  }
}

export {
  login,
  createInventory,
  getInventoryItems,
  updateInventory,
  deleteInventory,
};
