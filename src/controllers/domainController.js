import { Domain } from "../models/Domain.js";

export const saveDomain = async (req, res) => {
  try {
    const { domain, initialDomain, fullUrl, userAgent, visitorId } = req.body;

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

    if (visitorId) {
      const exists = await Domain.findOne({ visitorId });
      if (exists) {
        return res.status(200).json({ message: "Already stored" });
      }
    }

    await Domain.create({ domain, initialDomain, fullUrl, userAgent, visitorId });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// export const saveDomain = async (req, res) => {
//   try {
//     const { domain, initialDomain, fullUrl, userAgent, visitorId } = req.body;


//     if (!domain || !fullUrl) {
//       return res.status(400).json({ message: "Missing data" });
//     }


//     if (domain === initialDomain) {
//       return res.status(200).json({ message: "Ignored same domain" });
//     }


//     if (!fullUrl.endsWith("/")) {
//       return res.status(200).json({ message: "Ignored non-root URL" });
//     }


//     if (visitorId) {
//       const exists = await Domain.findOne({ visitorId });
//       if (exists) {
//         return res.status(200).json({ message: "Already stored" });
//       }
//     }

//     await Domain.create({
//       domain,
//       initialDomain,
//       fullUrl,
//       userAgent,
//       visitorId,
//     });

//     res.status(201).json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };