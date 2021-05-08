const router = require("express").Router();
const Purchase = require("../Model/Purchase");

router.post("/add", async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    const saved = await purchase.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(req.body);
  }
});

router.post("/bulkAdd", function (req, res) {
  try {
    var items = req.body.purchaseData;
    var bulk = Purchase.collection.initializeUnorderedBulkOp();
    for (var i = 0; i < items.length; i += 1) {
      console.log(i);
      bulk.insert(items[i]);
    }
    bulk.execute(function (errs) {
      if (errs) {
        return next(errs);
      }
    });
    res.send("Penjualan Ditambahkan");
  } catch (err) {
    console.log(err);
  }
});

router.get("/get", function (req, res, next) {
  Purchase.find()
    .then((purchase) => {
      res.json(purchase);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", function (req, res, next) {
  Purchase.findOne({ _id: req.params.id })
    .then((purchase) => {
      if (purchase) {
        res.json(purchase);
      } else {
        res.send("No Data Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/delete/:id", async (req, res) => {
  const items = await Purchase.findOne({ items: req.body.items });
  if (items !== []) {
    res.status(400).json({ message: "Masih ada item terdaftar" });
  }
  Purchase.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

module.exports = router;
