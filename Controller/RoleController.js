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

router.get("/get/:id", function (req, res, next) {
  Role.findOne({ _id: req.params.id })
    .then((role) => {
      if (role) {
        res.json(role);
      } else {
        res.send("No Data Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/delete/:id", function (req, res) {
  Role.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

module.exports = router;
