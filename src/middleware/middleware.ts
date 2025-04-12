import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

interface DecodedToken {
  id: string; // or `userId`, depending on how you signed it
}

export interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ success: false, message: "No valid token" });
    return;
  }

  try {
    const decoded = Jwt.verify(token, "secret") as DecodedToken;
    req.userId = decoded.id; // or `decoded.userId`
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
