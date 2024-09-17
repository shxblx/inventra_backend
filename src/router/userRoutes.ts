import express from "express";
import {
  createInventory,
  deleteInventory,
  getInventoryItems,
  login,
  updateInventory,
} from "../controller/itemController";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../controller/customerController";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/createInventory", createInventory);
userRouter.get("/getInventory/:page", getInventoryItems);
userRouter.patch("/updateInventory", updateInventory);
userRouter.patch("/deleteInventory", deleteInventory);
userRouter.post("/createCustomer", createCustomer);
userRouter.get("/getCustomers/:page", getCustomers);
userRouter.put("/updateCustomer", updateCustomer);
userRouter.patch("/deleteCustomer", deleteCustomer);

export default userRouter;
