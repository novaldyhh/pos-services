const router = require("express").Router();
const Branch = require("../Model/Branch");
const Brand = require("../Model/Brand");
const Category = require("../Model/Category");
const Items = require("../Model/Items");
const SubCategory = require("../Model/SubCategory");
const Supplier = require("../Model/Supplier");

router.post("/add", async (req, res) => {
  try {
    const item = new Items(req.body);
    await item.save();

    const branch = await Branch.findById({ _id: item.branch });
    branch.items.push(item);
    await branch.save();

    const brand = await Brand.findById({ _id: item.brand });
    brand.items.push(item);
    await brand.save();

    const category = await Category.findById({ _id: item.category });
    category.items.push(item);
    await category.save();

    const subCategory = await SubCategory.findById({ _id: item.subCategory });
    subCategory.items.push(item);
    await subCategory.save();

    const supplier = await Supplier.findById({ _id: item.supplier });
    supplier.items.push(item);
    await supplier.save();

    res.status(201).json({ messages: "Produk Ditambahkan", data: item });
  } catch (err) {
    res.status(400);
  }
});

router.get("/list/:id", async (req, res, next) => {
  try {
    await Branch.findById({ _id: req.params.id })
      .populate({
        path: "items",
        select: "itemName serialNumber barcode quantity price totalValue",
      })
      .then((data) => {
        res.json(data.items);
      });
  } catch (err) {
    res.send("DB Error");
  }
});

router.get("/get/:id", function (req, res, next) {
  Items.findOne({ _id: req.params.id })
    .then((item) => {
      if (item) {
        res.json(item);
      } else {
        res.send("No Data Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/delete/:id", function (req, res) {
  Items.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

module.exports = router;
