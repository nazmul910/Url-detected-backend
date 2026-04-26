import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import domainRoutes from "./routes/domainRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/api", domainRoutes);

export default app;