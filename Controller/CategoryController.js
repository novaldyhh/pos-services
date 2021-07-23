const router = require("express").Router();
const Category = require("../Model/Category");
const auth = require("../Helper/jwt-handler");
const Coa = require("../Model/Coa");

router.post("/add", auth, async (req, res) => {
  const verify = await Category.findOne({
    categoryName: req.body.categoryName,
  });
  if (verify) {
    return res.status(400).send("Nama Kategori Tidak Boleh Sama");
  }
  try {
    const category = new Category(req.body);
    await category.save();

    const coa = await Coa.findById({ _id: category.coa });
    coa.productCategory.push(category);
    await coa.save();

    res
      .status(201)
      .json({ messages: "Kategori Produk Ditambahkan", data: category });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/get", auth, async (req, res, next) => {
  Category.find()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", auth, function (req, res, next) {
  Category.findOne({ _id: req.params.id })
    .then((category) => {
      if (category) {
        res.json(category);
      } else {
        res.send("No Data Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/edit/:id", auth, async function (req, res) {
  Category.updateOne({
    _id: req.params.id,
    ...req.body,
  })
    .then(res.json("Data Berubah" + req.body))
    .catch((err) => {
      res.send(err);
    });
});

router.get("/list/:id", auth, async (req, res, next) => {
  try {
    await Coa.findById({ _id: req.params.id })
      .populate({
        path: "productCategories",
        select: "categoryName ",
      })
      .then((data) => {
        res.json(data.items);
      });
  } catch (err) {
    res.send("DB Error");
  }
});

router.delete("/delete/:id", auth, function (req, res) {
  Category.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

module.exports = router;
