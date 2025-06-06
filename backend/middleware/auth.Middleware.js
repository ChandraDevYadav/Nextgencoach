import jwt from "jsonwebtoken";
import User from "../models/user.Model.js";

// Auth middleware for all authenticated users
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Not authorized, token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token failed", error: error.message });
  }
};

// Auth middleware specifically for coach-only access
export const protectCoach = (req, res, next) => {
  if (req.user?.role !== "coach") {
    return res
      .status(403)
      .json({ message: "Access denied: Coach role required" });
  }
  next();
};
