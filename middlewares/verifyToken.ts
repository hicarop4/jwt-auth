import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const auth = req.header("Authorization") || req.header("authorization");
  if (!auth) return res.status(401).send("Access Denied");
  const token = auth.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET ?? "";
    const verified = jwt.verify(token, secret);
    res.setHeader("user", JSON.stringify(verified));
  } catch (err) {
    res.status(400).send("Access Denied: " + err);
  }

  next();
}

module.exports = verifyToken;
