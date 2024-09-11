import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();

import connectDB from "./config/database";
connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:3030", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: string | number = process.env.PORT || 4040;

app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
});
