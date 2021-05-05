const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../Model/Role");
const Branch = require("../Model/Branch");
const key = process.env.KEY;

router.post("/add", async (req, res) => {
  const verifyUsername = await User.findOne({ username: req.body.username });
  if (verifyUsername) {
    const isAdmin = verifyUsername.isAdmin;
    if (verifyUsername && isAdmin)
      return res.status(400).send("Username Gaboleh Sama");
  }

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
    branch: req.body.branch,
    role: req.body.role,
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
    .then((user) => {
      res.json(user);
      next();
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.delete("/delete/:id", function (req, res) {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", function (req, res, next) {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user) {
        res.json(user);
        next();
      } else {
        res.send("No Data Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/login", async (req, res) => {
  const username = await User.findOne({ username: req.body.username });
  if (!username) return res.status(400).send("Login Gagal");

  const roleId = username.role;
  const branchId = username.branch;

  const role = await Role.findOne({ _id: roleId }).populate("Roles");
  const branch = await Branch.findOne({ _id: branchId }).populate("Branch");

  const checkPassword = await bcrypt.compare(
    req.body.password,
    username.password
  );
  if (!checkPassword) return res.status(400).send("Login Gagal");

  const token = jwt.sign({ _id: username.id }, key);
  res.json({
    token: token,
    role: role.role,
    branchId: branchId,
    branch: branch.branchName,
    mainBranch: branch.isMainBranch,
  });
});

module.exports = router;
