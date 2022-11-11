import express from "express";
const router = express();
const User = require("../models/user_model");

const {
  loginUser,
  signupUser,
  logoutUser,
  getAccountDetails,
  updatePassword,
  forgotPassword,
} = require("../controllers/user_controller");

const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");
import {
  LoginValidate,
  userSignupValidate,
  updatePasswordValidate,
  forgotPasswordValidate,
} from "../controllers/validation";

router.route("/signup").post(userSignupValidate, signupUser);
router.route("/login").post(LoginValidate, loginUser);
router.route("/logout").get(logoutUser);

router
  .route("/me")
  .get(isAuthenticated, hasPermissionRole(['userCreate',"admin"]), getAccountDetails);

router
  .route("/password/update")
  .put(isAuthenticated, updatePasswordValidate, updatePassword);
router
  .route("/password/forgot")
  .put(isAuthenticated, forgotPasswordValidate, forgotPassword);

module.exports = router;
