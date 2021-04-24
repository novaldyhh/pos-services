const router = require("express").Router();
const Branch = require("../Model/Branch");

router.post("/add", async (req, res) => {
  const branch = new Branch({
    branchName: req.body.branchName,
    isMainBranch: req.body.branchName,
    phone: req.body.phone,
  });
  try {
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
