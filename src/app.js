import express from "express";
import cors from "cors";
import domainRoutes from "./routes/domainRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", domainRoutes);

export default app;