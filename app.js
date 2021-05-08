require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const activePort = process.env.ACTIVE_PORT || 8080;
// var corsOptions = { origin: "http://localhost" };
var db = process.env.DB;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log("Connection Interrupted" + e));

const corsOptions = {
  exposeHeaders: "Authorization",
};
// app.use(cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BranchController = require("./Controller/BranchController");
const UserController = require("./Controller/UserController");
const RoleController = require("./Controller/RoleController");
const SupplierController = require("./Controller/SupplierController");
const ItemsController = require("./Controller/itemsController");
const CategoryController = require("./Controller/CategoryController");
const SubCategoryController = require("./Controller/SubCategoryController");
const BrandController = require("./Controller/BrandController");
const PurchaseController = require("./Controller/PurchaseController");

app.use("/branch", BranchController);
app.use("/user", UserController);
app.use("/role", RoleController);
app.use("/supplier", SupplierController);
app.use("/items", ItemsController);
app.use("/categories", CategoryController);
app.use("/subcategory", SubCategoryController);
app.use("/brand", BrandController);
app.use("/purchase", PurchaseController);

app.listen(activePort, () => {
  console.log("Server is running in " + activePort);
});
