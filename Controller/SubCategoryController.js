const router = require("express").Router();
const SubCategory = require("../Model/SubCategory");
const Category = require("../Model/Category");

router.post("/add", async (req, res) => {
  const verify = await SubCategory.findOne({ subCategoryName: req.body.subCategoryName });
  if (verify) {
    return res.status(400).send("Nama Sub Kategori Tidak Boleh Sama");
  }
  try {
    const subCategory = new SubCategory(req.body);
    await subCategory.save();

    const category = await Category.findById({ _id: subCategory.category });
    category.subCategories.push(subCategory);
    await category.save();

    res.status(201).json({ message: "Data Ditambahkan", data: subCategory });
  } catch (err) {
    res.status(400).send(req.body);
  }
});

router.get("/get", function (req, res, next) {
  SubCategory.find()
    .then((subCategory) => {
      res.json(subCategory);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/list/:id", async (req, res, next) => {
  try {
    await Category.findById({ _id: req.params.id })
      .populate({
        path: "subCategories",
        select: "subCategoryName",
      })
      .then((data) => {
        res.json(data.subCategories);
      });
  } catch (err) {}
});

router.get("/get/:id", function (req, res, next) {
  SubCategory.findOne({ _id: req.params.id })
    .then((subCategory) => {
      if (subCategory) {
        res.json(subCategory);
      } else {
        res.send("No Data Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/delete/:id", function (req, res) {
  SubCategory.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

module.exports = router;
