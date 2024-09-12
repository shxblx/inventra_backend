import express from "express";
import {
  createInventory,
  deleteInventory,
  getInventoryItems,
  login,
  updateInventory,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/createInventory", createInventory);
userRouter.get("/getInventory/:page", getInventoryItems);
userRouter.patch("/updateInventory", updateInventory);
userRouter.patch("/deleteInventory", deleteInventory);

export default userRouter;
