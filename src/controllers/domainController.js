import { Domain } from "../models/Domain.js";

export const saveDomain = async (req, res) => {
  try {
    const { domain, initialDomain, fullUrl, userAgent } = req.body;

    if (!domain || !fullUrl) {
      return res.status(400).json({ message: "Missing data" });
    }

    const normalize = (d) => d.replace(/^www\./, "");
    if (normalize(domain) === normalize(initialDomain)) {
      return res.status(200).json({ message: "Ignored same domain" });
    }

    const url = fullUrl.endsWith("/") ? fullUrl : fullUrl + "/";
    const urlObj = new URL(url);
    if (urlObj.pathname !== "/") {
      return res.status(200).json({ message: "Ignored non-root URL" });
    }

    const exists = await Domain.findOne({ 
      domain: { $regex: new RegExp(`^(www\\.)?${normalize(domain)}$`, "i") }
    });
    
    if (exists) {
      return res.status(200).json({ message: "Domain already exists" });
    }

    await Domain.create({ domain, initialDomain, fullUrl, userAgent });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};