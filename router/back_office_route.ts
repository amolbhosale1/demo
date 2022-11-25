const express = require("express");
const {
  IamloginUser,
  IamsignupUser,
  IamlogoutUser,
  IamgetAccountDetails,
  IamupdatePassword,
  IamgetAllUsers,
  IamsearchUsers,
  IamgetUserDetailsById,
  IamdeleteProfile,
} = require("../controllers/access_control");
const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");

import {
  accessControlDelete,
  acessControlSignupValidate,
  LoginValidate,
  updatePasswordValidate,
} from "../controllers/validation";

import grantList from "../models/access_control_LIst";
const User = require("../models/user_model");
const AccessControlModel = require("../models/access_control_model");

const router = express();

router
  .route("/signup")
  .post(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role, grantList.userCreate.role], User),
    acessControlSignupValidate,
    IamsignupUser
  );
router.route("/login").post(LoginValidate, IamloginUser);
router.route("/logout").get(IamlogoutUser);

router
  .route("/me")
  .get(isAuthenticated(AccessControlModel), IamgetAccountDetails)
  .delete(
    isAuthenticated(User),
    accessControlDelete,
    hasPermissionRole([grantList.admin.role, grantList.userDelete.role], User),
    IamdeleteProfile
  );

router
  .route("/password/update")
  .put(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role, grantList.userUpdate.role], User),
    updatePasswordValidate,
    IamupdatePassword
  );

router
  .route("/user/all")
  .get(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role, grantList.userRead.role], User),
    IamgetAllUsers
  );

router
  .route("/user")
  .get(
    isAuthenticated(User),
    hasPermissionRole(
      [
        grantList.admin.role,
        grantList.userRead.role,
        grantList.userDelete.role,
        grantList.userUpdate.role,
        grantList.userCreate.role,
      ],
      User
    ),
    IamsearchUsers
  );

router
  .route("/user/:id")
  .get(
    isAuthenticated(User),
    hasPermissionRole(
      [
        grantList.admin.role,
        grantList.userRead.role,
        grantList.userDelete.role,
        grantList.userUpdate.role,
        grantList.userCreate.role,
      ],
      User
    ),
    IamgetUserDetailsById
  );

module.exports = router;
