const router = require("express").Router();
const Role = require("../Model/Role");

router.post("/add", async (req, res) => {
  const role = new Role({
    ...req.body,
  });
  try {
    const saved = await role.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(req.body);
  }
});

router.get("/get", function (req, res, next) {
  Role.find()
    .then((role) => {
      res.json(role);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

module.exports = router;
