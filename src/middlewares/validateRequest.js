export const validateRequest = (req, res, next) => {
  const secret = req.headers["x-secret"];

  if (secret !== process.env.SECRET_KEY) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};