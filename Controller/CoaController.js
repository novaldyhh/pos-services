const router = require("express").Router();
const Coa = require("../Model/Coa");
const auth = require("../Helper/jwt-handler");

router.post("/add", auth, async (req, res) => {
  try {
    const coa = new Coa(req.body);
    const saved = await coa.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(req.body);
  }
});
