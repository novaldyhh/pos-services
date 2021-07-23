const router = require("express").Router();
const Coa = require("../Model/Coa");
const auth = require("../Helper/jwt-handler");

router.post("/add", auth, async (req, res) => {
  try {
    const coa = new Coa({
      ...req.body,
    });
    const saved = await coa.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/get", auth, function (req, res, next) {
  Coa.find()
    .then((coas) => {
      res.json(coas);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.get("/get/:id", auth, async function (req, res, next) {
  await Coa.findOne({ _id: req.params.id })
    .then((coas) => {
      if (coas) {
        res.json(coas);
      } else {
        res.send("No Data Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/edit/:id", auth, async function (req, res) {
  const coas = await Coa.findOne({ _id: req.params.id });
  const productCategory = coas.productCategory;
  if (productCategory.length !== 0)
    return res.status(500).send("Data Tidak Bisa Diubah");
  await Coa.updateOne({ _id: req.params.id, ...req.body })
    .then(() => {
      res.json("Data Berubah: " + req.body);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/delete/:id", auth, async (req, res) => {
  const coas = await Coa.findOne({ _id: req.params.id });
  const productCategory = coas.productCategory;
  if (productCategory.length !== 0)
    return res.status(500).send("Data Tidak Bisa Dihapus");
  await Coa.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = router;
