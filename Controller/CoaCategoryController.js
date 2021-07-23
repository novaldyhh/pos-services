const router = require("express").Router();
const CoaCategory = require("../Model/CoaCategory");
const auth = require("../Helper/jwt-handler");

router.post("/add", auth, async (req, res) => {
  try {
    const coa = new CoaCategory({
      ...req.body,
      coaName: req.body.categoryName,
      code: req.body.code,
    });

    const saved = await coa.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/get/:id", auth, async function (req, res, next) {
  await CoaCategory.findOne({ _id: req.params.id })
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

router.get("/get", auth, function (req, res, next) {
  CoaCategory.find()
    .then((coas) => {
      res.json(coas);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = router;
