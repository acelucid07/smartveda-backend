const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/Authentication/user");
const { forgot, resetPassword } = require("../controllers/forgot");
const { otpsignup, verifyotp, otplogout } = require("../controllers/otp");
const passport = require("passport");
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot", forgot);
router.post("/otpsignup", otpsignup);
router.post("/otpverify", verifyotp);
router.post("/resetPassword/:userId/:token", resetPassword);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google", session: false }),
  (req, res, next) => {
    res.redirect("smartveda://app/preferrenceScreen?name=${req.user.name}/email=${req.user.email}`");
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
module.exports = router;
