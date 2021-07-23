const router = require("express").Router();
const Supplier = require("../Model/Supplier");
const auth = require("../Helper/jwt-handler");

router.post("/add", auth, async (req, res) => {
  const supplier = new Supplier({
    ...req.body,
  });
  try {
    const saved = await supplier.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(req.body);
  }
});

router.get("/get", auth, function (req, res, next) {
  Supplier.find()
    .then((supplier) => {
      res.json(supplier);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", auth, function (req, res, next) {
  Supplier.findOne({ _id: req.params.id })
    .then((supplier) => {
      if (supplier) {
        res.json(supplier);
      } else {
        res.send("No Data Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/delete/:id", auth, function (req, res) {
  Supplier.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.put("/edit/:id", auth, async function (req, res) {
  await Supplier.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => {
      res.json("Data Berubah: " + req.body);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
