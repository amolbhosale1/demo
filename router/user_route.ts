import express from "express";
const router = express();
const User = require("../models/user_model");
const {
  IamIamloginUser,
  IamsignupUser,
  IamlogoutUser,
  IamgetAccountDetails,
  IamupdatePassword,
  IamgetAllUsers,
  IamsearchUsers,
  IamgetUserDetailsById,
  IamdeleteProfile,
} = require("../controllers/access_control");
const {
  loginUser,
  signupUser,
  logoutUser,
  getAccountDetails,
  updatePassword,
  forgotPassword,
  deleteProfile,
  verifyOtp,
} = require("../controllers/user_controller");

const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");
import {
  LoginValidate,
  userSignupValidate,
  updatePasswordValidate,
  forgotPasswordValidate,
  acessControlSignupValidate,
  verifyOtpValidate,
} from "../controllers/validation";
import grantList from "../models/access_control_LIst";

router.route("/signup").post(userSignupValidate, signupUser);
router.route("/login").post(LoginValidate, loginUser);
router.route("/logout").get(logoutUser);
router.route("/verifyotp").post(verifyOtpValidate,verifyOtp);

router
  .route("/me")
  .get(
    isAuthenticated(User),
    getAccountDetails
  )
  .delete(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role], User),
    deleteProfile
  );

router
  .route("/password/update")
  .put(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role], User),
    updatePasswordValidate,
    updatePassword
  );
router
  .route("/password/forgot")
  .put(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role], User),
    forgotPasswordValidate,
    forgotPassword
  );

module.exports = router;
