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


const passport = require("passport");
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
module.exports = router;
