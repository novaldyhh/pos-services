const router = require("express").Router();
const Customer = require("../Model/Customer");
const auth = require("../Helper/jwt-handler");

router.post("/add", auth, async (req, res) => {
  const customer = new Customer({
    ...req.body,
  });
  try {
    const saved = await customer.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/get", auth, function (req, res, next) {
  Customer.find()
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", auth, function (req, res, next) {
  Customer.findOne({ _id: req.params.id })
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        res.send("No Data Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/delete/:id", auth, function (req, res) {
  Customer.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

module.exports = router;
