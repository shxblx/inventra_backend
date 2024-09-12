import express from "express";
import { createInventory, login } from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/createInventory", createInventory);

export default userRouter;
