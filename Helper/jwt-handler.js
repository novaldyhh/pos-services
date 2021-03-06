const jwt = require("jsonwebtoken");
const key = process.env.KEY;

module.exports = function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Not allowed...");
  try {
    const allowed = jwt.verify(token, key);
    req.admin = allowed;
    next();
  } catch (err) {
    res.status(400).send("Not allowed...");
  }
};
