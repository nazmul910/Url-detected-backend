import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
  },
  initialDomain: String,
  fullUrl: String,
  userAgent: String,
  visitorId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Domain =
  mongoose.models.Domain || mongoose.model("Domain", domainSchema);