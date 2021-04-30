const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = process.env.KEY;

router.post("/add", async (req, res) => {
  const verifyUsername = await User.findOne({ username: req.body.username });
  if (verifyUsername) return res.status(400).send("Username Gaboleh Sama");

  const salt = await bcrypt.genSalt(10);
  var hash = null;
  if (req.body.password) {
    hash = await bcrypt.hash(req.body.password, salt);
  }
  const user = new User({
    isAdmin: req.body.isAdmin,
    isActive: req.body.isActive,
    username: req.body.username,
    password: hash,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    name: req.body.name,
    branch: req.branch,
    role: req.role,
  });
  try {
    const saved = await user.save();
    res.send(saved);
  } catch (err) {
    res.status(400).send(req.body);
  }
});

router.get("/get", function (req, res, next) {
  User.find()
    .populate("Branches")
    .exec()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.post("/login", async (req, res) => {
  const username = await User.findOne({ username: req.body.username });
  if (!username) return res.status(400).send("Login Gagal");

  const checkPassword = await bcrypt.compare(
    req.body.password,
    username.password
  );
  if (!checkPassword) return res.status(400).send("Login Gagal");

  const token = jwt.sign({ _id: username.id }, key);
  res.header("Barrier-Token", token).send(token);
});

// router.post("/login", async (req, res) => {
//   User.findOne({
//     where: { username: req.body.username },
//   })
//     .then((router) => {
//       console.log(router);
//       if (router) {
//         if (bcrypt.compareSync(req.body.password, router.password)) {
//           let token = jwt.sign(router.dataValues, process.env.KEY, {
//             expiresIn: 1440,
//           });
//           res.send(token);
//         }
//       } else {
//         res.status(400).json({ error: req.body.username + " Tidak Terdaftar" });
//       }
//     })
//     .catch((err) => {
//       res.status(400).json({ error: err });
//     });
// });

module.exports = router;
