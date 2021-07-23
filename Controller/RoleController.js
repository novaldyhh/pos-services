const router = require("express").Router();
const Role = require("../Model/Role");
const auth = require("../Helper/jwt-handler");

router.post("/add", auth, async (req, res) => {
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

router.get("/get", auth, function (req, res, next) {
  Role.find()
    .then((role) => {
      res.json(role);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", auth, function (req, res, next) {
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

router.put("/edit/:id", auth, async function (req, res) {
  await Role.updateOne(
    { _id: req.params.id },
    {
      role: req.body.role,
      fees: req.body.fees,
      basicSalary: req.body.basicSalary,
    }
  )
    .then(() => {
      console.log(req.body);
      res.send(req.body);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/delete/:id", auth, function (req, res) {
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
