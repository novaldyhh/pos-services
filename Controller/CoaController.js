const router = require("express").Router();
const Coa = require("../Model/Coa");
const auth = require("../Helper/jwt-handler");

router.post("/add", auth, async (req, res) => {
  try {
    var counter = 0;
    counter++;
    conter <= 10 ? "00" + counter : counter <= 100 ? "0" + counter : counter;

    var code = req.body.coaCategory + "" + counter;
    const coa = new Coa({ ...req.body, coaName: req.body.coaName, coaCode: code });
    console.log(code);
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

module.exports = router;
