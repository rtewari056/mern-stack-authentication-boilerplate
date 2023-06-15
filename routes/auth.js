const express = require("express");

const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:resetToken").put(resetPassword);

// router.route("/createTransaction").post(createTransaction);
// router.route("/transactions").get(getUserTransactions);

module.exports = router;
