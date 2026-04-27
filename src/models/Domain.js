import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
  updatedDomain: {
    type: String,
    required: true,
  },
  oldDomain: String,
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