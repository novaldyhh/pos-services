const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../Model/Role");
const Branch = require("../Model/Branch");
const key = process.env.KEY;
const auth = require("../Helper/jwt-handler");

router.post("/add", auth, async (req, res) => {
  const verifyUsername = await User.findOne({ username: req.body.username });
  if (verifyUsername) {
    const isAdmin = verifyUsername.isAdmin;
    if (verifyUsername && isAdmin) return res.status(400).send("Username Gaboleh Sama");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    var hash = null;
    if (req.body.password) {
      hash = await bcrypt.hash(req.body.password, salt);
    }

    const isAdmin = req.body.isAdmin;

    const user = new User({
      ...req.body,
      username: isAdmin === true ? req.body.username : "",
      password: isAdmin === true ? hash : null,
    });
    await user.save();

    const branch = await Branch.findById({ _id: user.branch });
    branch.users.push(user);
    await branch.save();

    const role = await Role.findById({ _id: user.role });
    role.users.push(user);
    await role.save();

    res.status(201).json({ messages: "User Ditambahkan", data: user });
  } catch (err) {
    res.status(400).json({ messages: "Sistem Error Ulangi Beberapa Saat Lagi" });
  }
});

router.get("/get", auth, function (req, res, next) {
  User.find()
    .then((user) => {
      res.json(user);
      next();
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.delete("/delete/:id", auth, function (req, res) {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ status: "Data is Destroyed" });
    })
    .catch((err) => {
      res.send("error: " + err);
      console.log(err);
    });
});

router.get("/get/:id", auth, function (req, res, next) {
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

  const checkPassword = await bcrypt.compare(req.body.password, username.password);
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
