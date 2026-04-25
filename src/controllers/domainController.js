import { Domain } from "../models/Domain.js";

export const saveDomain = async (req, res) => {
  try {
    const { domain, initialDomain, fullUrl, userAgent, visitorId } = req.body;

    // basic validation
    if (!domain || !fullUrl) {
      return res.status(400).json({ message: "Missing data" });
    }

    // ignore same domain
    if (domain === initialDomain) {
      return res.status(200).json({ message: "Ignored same domain" });
    }

    // only root URL check
    if (!fullUrl.endsWith("/")) {
      return res.status(200).json({ message: "Ignored non-root URL" });
    }

    // duplicate check (optional but useful)
    if (visitorId) {
      const exists = await Domain.findOne({ visitorId });
      if (exists) {
        return res.status(200).json({ message: "Already stored" });
      }
    }

    await Domain.create({
      domain,
      initialDomain,
      fullUrl,
      userAgent,
      visitorId,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};