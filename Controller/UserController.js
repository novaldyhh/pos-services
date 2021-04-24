const router = require("express").Router();
const User = require("../Model/User");

router.post("/add", async (req, res) => {
  console.log(req.branch);
  const user = new User({
    ...req.body,
    branch: req.branch,
  });
  try {
    const saved = await user.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(req.body);
  }
});

module.exports = router;
