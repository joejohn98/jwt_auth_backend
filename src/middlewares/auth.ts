import type { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt";

const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      status: "failed",
      message: "you are not authorized",
    });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const user = verifyToken(token as string);
    (req as any).user = user;
    next();
  } catch (error) {
    console.log("error to protect", error);
    res.status(500).json({
      status: "failed",
      message: "Invalid or expired token",
    });
  }
};

export default protect;
