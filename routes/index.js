const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/Authentication/user");
const { forgot, resetPassword } = require("../controllers/forgot");
const { create, update, findall, find } = require("../controllers/update");
const { del, delall } = require("../controllers/status");
const rolehandler = require("../controllers/rolehandler");
const { otpsignup, verifyotp, otplogout } = require("../controllers/otp");
const { adminLogin } = require("../controllers/Authentication/user");
const {downloadcsv} = require("../controllers/downloadcsv");
const { uploadimage } = require("../controllers/image");
const { upload } = require("../controllers/image");
const { getParentCategoryById, getAllParentCategory, updateParentCategory, deleteParentCategory } = require("../controllers/parentcategory")
const { getCategoryById, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category")
const { createProduct, getAllProduct, getProduct, deleteProduct, updateProduct} = require("../controllers/product")
const passport = require("passport");
const multer  = require('multer')
const path = require("path");
const { getAllOrders, getOrder, updateOrder, deleteOrder } = require("../controllers/order");
const storage = multer.diskStorage(
  {
  destination: function (req, file, cb) {
      cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
      let ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
  },
}
);

const upload2 = multer({
  storage: storage,
});


router.post("/signup", signup);
router.post("/login", login);
router.post("/adminlogin", adminLogin);
router.post("/logout", logout);
router.post("/forgot", forgot);
router.post("/otpsignup", otpsignup);
router.post("/otpverify", verifyotp);
router.post("/uploadimage", upload, uploadimage);
router.post("/resetPassword/:userId/:token", resetPassword);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google",
    session: false,
  }),
  (req, res, next) => {
    res.redirect("mychat://preferrenceScreen");
  }
);
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    session: false,
  })
);
router.post(
  "/createuser",
  rolehandler.grantAccess("createAny", "profile"),
  create
);
router.put(
  "/update/:id",
  rolehandler.grantAccess("updateOwn", "profile"),
  update
);
router.put("/delete/:id", rolehandler.grantAccess("deleteOwn", "profile"), del);
router.get("/users", rolehandler.grantAccess("readAny", "profile"), findall);
router.get("/user/:id", find);
router.put(
  "/deleteall",
  rolehandler.grantAccess("deleteAny", "profile"),
  delall
);
router.get("/downloadcsv",downloadcsv);

//parent category table api

router.get("/parentcategories", rolehandler.grantAccess("readOwn", "profile"),getParentCategoryById);
router.get("/parentcategories",rolehandler.grantAccess("readOwn", "profile"),getAllParentCategory);
router.put("/parentcategories",rolehandler.grantAccess("updateOwn", "profile"),updateParentCategory);
router.delete("/parentcategories",rolehandler.grantAccess("deleteOwn", "profile"),deleteParentCategory);

//category table api

router.get("/categories", rolehandler.grantAccess("readOwn", "profile"),getCategoryById);
router.get("/categories",rolehandler.grantAccess("readOwn", "profile"),getAllCategory);
router.put("/categories",rolehandler.grantAccess("updateOwn", "profile"),upload2.single("image"),updateCategory);
router.delete("/categories",rolehandler.grantAccess("deleteOwn", "profile"),deleteCategory);

//product table api 

router.post("/products", rolehandler.grantAccess("createOwn", "profile"),upload2.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]),createProduct);
router.get("/products", rolehandler.grantAccess("readOwn", "profile"),getProduct);
router.get("/products",rolehandler.grantAccess("readOwn", "profile"),getAllProduct);
router.put("/products",rolehandler.grantAccess("updateOwn", "profile"),upload2.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]),updateProduct);
router.delete("/products",rolehandler.grantAccess("deleteOwn", "profile"),deleteProduct);

//order table api

router.get("/orders", rolehandler.grantAccess("readOwn", "profile"),getAllOrders);
router.get("/orders", rolehandler.grantAccess("readOwn", "profile"),getOrder);
router.put("/orders", rolehandler.grantAccess("updateOwn", "profile"),upload2.none(),updateOrder);
router.delete("/orders",rolehandler.grantAccess("deleteOwn", "profile"),deleteOrder);
module.exports = router;
