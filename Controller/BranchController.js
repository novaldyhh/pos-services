const router = require("express").Router();
const Branch = require("../Model/Branch");
const Item = require("../Model/Items");
const auth = require("../Helper/jwt-handler");

router.post("/add", auth, async (req, res) => {
  try {
    const branch = new Branch(req.body);
    const saved = await branch.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(req.body);
  }
});

router.get("/get", auth, async function (req, res, next) {
  await Branch.find()
    .then((branch) => {
      res.json(branch);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", auth, async function (req, res, next) {
  await Branch.findOne({ _id: req.params.id })
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

router.delete("/delete/:id", auth, async (req, res) => {
  const branch = await Branch.findOne({ _id: req.params.id });
  const users = branch.users;
  if (users.length !== 0)
    return res.status(500).send("Data Tidak Bisa Dihapus");
  await Branch.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.put("/edit/:id", auth, async function (req, res) {
  await Branch.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => {
      res.json({ messages: "Data Berubah", data: req.body });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/close/:id", auth, async function (req, res) {
  await Branch.updateOne(
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
