const router = require("express").Router();
const Branch = require("../Model/Branch");
const Item = require("../Model/Items");

router.post("/add", async (req, res) => {
  try {
    const branch = new Branch(req.body);
    const saved = await branch.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(req.body);
  }
});

router.get("/get", function (req, res, next) {
  Branch.find()
    .then((branch) => {
      res.json(branch);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", function (req, res, next) {
  Branch.findOne({ _id: req.params.id })
    .then((branch) => {
      if (branch) {
        res.json(branch);
      } else {
        res.send("No Data Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/delete/:id", function (req, res) {
  Branch.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.put("/edit/:id", function (req, res) {
  Branch.updateOne(
    { _id: req.params.id },
    {
      branchName: req.body.branchName,
      isMainBranch: req.body.branchName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      isOpen: req.body.isOpen,
      postalCode: req.body.postalCode,
    }
  )
    .then(() => {
      res.json(req.body);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/close/:id", function (req, res) {
  Branch.updateOne(
    { _id: req.params.id },
    {
      isOpen: req.body.isOpen,
    }
  )
    .then(() => {
      res.json(req.body);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
