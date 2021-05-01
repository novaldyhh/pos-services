const router = require("express").Router();
const Supplier = require("../Model/Supplier");

router.post("/add", async (req, res) => {
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

router.get("/get", function (req, res, next) {
  Supplier.find()
    .then((supplier) => {
      res.json(supplier);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", function (req, res, next) {
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

router.delete("/delete/:id", function (req, res) {
  Supplier.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

module.exports = router;
