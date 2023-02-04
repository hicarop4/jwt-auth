const jwt = require("jsonwebtoken");

function verificaToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied: Unauthorized");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).send("Access Denied: " + err);
  }

  next();
}

module.exports = verificaToken;
