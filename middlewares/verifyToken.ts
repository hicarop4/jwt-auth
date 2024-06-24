import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const auth = req.header("Authorization") || req.header("authorization");
  if (!auth)
    return res.status(401).send("You need to provide an authorization token.");
  const token = auth.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET ?? "";
    const verified = jwt.verify(token, secret);
    // set User details in header so we can use it in next requests
    res.setHeader("user", JSON.stringify(verified));
  } catch (err) {
    return res.status(400).send("Access Denied: " + err);
  }

  next();
}

export default verifyToken;
