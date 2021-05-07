const router = require("express").Router();
const Category = require("../Model/Category");

router.post("/add", async (req, res) => {
  const verify = await Category.findOne({ categoryName: req.body.categoryName });
  if (verify) {
    return res.status(400).send("Nama Kategori Tidak Boleh Sama");
  }
  try {
    const category = new Category(req.body);
    const saved = await category.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(req.body);
  }
});

router.get("/get", function (req, res, next) {
  Category.find()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", function (req, res, next) {
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

router.delete("/delete/:id", function (req, res) {
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
