const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const auth = req.header("Authorization") || req.header("authorization");
  if (!auth) return res.status(401).send("Access Denied");
  const token = auth.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).send("Access Denied: " + err);
  }

  next();
}

module.exports = verifyToken;
