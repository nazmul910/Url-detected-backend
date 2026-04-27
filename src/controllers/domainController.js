import { Domain } from "../models/Domain.js";
import { sendEmail } from "../utils/sendEmail.js";

export const saveDomain = async (req, res) => {
  try {
    const { updatedDomain, oldDomain, fullUrl, userAgent } = req.body;

    if (!updatedDomain || !fullUrl) {
      return res.status(400).json({ message: "Missing data" });
    }

    const normalize = (d) => d.replace(/^www\./, "");
    if (normalize(updatedDomain) === normalize(oldDomain)) {
      return res.status(200).json({ message: "Ignored same domain" });
    }

    const url = fullUrl.endsWith("/") ? fullUrl : fullUrl + "/";
    const urlObj = new URL(url);
    if (urlObj.pathname !== "/") {
      return res.status(200).json({ message: "Ignored non-root URL" });
    }

    const exists = await Domain.findOne({ 
      updatedDomain: { $regex: new RegExp(`^(www\\.)?${normalize(updatedDomain)}$`, "i") }
    });
    
    if (exists) {
      return res.status(200).json({ message: "Domain already exists" });
    }

    const newDomain = await Domain.create({ updatedDomain, oldDomain, fullUrl, userAgent });

    await sendEmail(newDomain);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};