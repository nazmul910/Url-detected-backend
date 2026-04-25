import express from "express";
import { saveDomain } from "../controllers/domainController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post("/save-domain", validateRequest, saveDomain);

router.get("/all-data", (req, res) => {
  res.send("Hello World - API is working 🚀");
});

export default router;