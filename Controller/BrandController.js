const router = require("express").Router();
const Brand = require("../Model/Brand");
const auth = require("../Helper/jwt-handler");

router.post("/add", auth, async (req, res) => {
  const verify = await Brand.findOne({ brandName: req.body.brandName });
  if (verify) {
    return res.status(400).send("Nama Kategori Tidak Boleh Sama");
  }
  try {
    const brand = new Brand(req.body);
    const saved = await brand.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(req.body);
  }
});

router.get("/get", auth, function (req, res, next) {
  Brand.find()
    .then((brand) => {
      res.json(brand);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", auth, function (req, res, next) {
  Brand.findOne({ _id: req.params.id })
    .then((brand) => {
      if (brand) {
        res.json(brand);
      } else {
        res.send("No Data Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/delete/:id", auth, async (req, res) => {
  const items = await Brand.findOne({ items: req.body.items });
  if (items !== []) {
    res.status(400).json({ message: "Masih ada item terdaftar" });
  }
  Brand.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

module.exports = router;
