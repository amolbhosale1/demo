const express = require("express");
const {
  loginUser,
  signupUser,
  logoutUser,
  getAccountDetails,
  updatePassword,
  getAllUsers,
  searchUsers,
  getUserDetailsById,
} = require("../controllers/access_control");
const { isAuthenticated } = require("../middleware/auth");
// const {
//   acessControlSignupValidate,
//   userLoginValidate,
//   updatePasswordValidate,
// } = require("../controllers/validation");

import {
  acessControlSignupValidate,
  LoginValidate,
  updatePasswordValidate,
} from "../controllers/validation";

const router = express();

router
  .route("/signup")
  .post(isAuthenticated, acessControlSignupValidate, signupUser);
router.route("/login").post(isAuthenticated, LoginValidate, loginUser);
router.route("/logout").get(isAuthenticated, logoutUser);

router.route("/me").get(isAuthenticated, getAccountDetails);

router
  .route("/password/update")
  .put(isAuthenticated, updatePasswordValidate, updatePassword);

router.route("/user/all").get(isAuthenticated, getAllUsers);

router.route("/user").get(isAuthenticated, searchUsers);

router.route("/user/:id").get(isAuthenticated, getUserDetailsById);

module.exports = router;
