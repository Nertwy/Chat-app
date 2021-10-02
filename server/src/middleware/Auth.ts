import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { secret } from "../config";
export const authMiddleware = (req, res: Response, next: Function) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //mb BUG
    if (!token) {
      return res.status(403).json({ message: "User Not authorized" });
    }
    const decodeData = Jwt.verify(token, secret.secret);
    req.users = decodeData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "User Not authorized" });
  }
};
