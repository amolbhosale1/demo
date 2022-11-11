import { check } from "express-validator";
import { ValidationChain } from "express-validator/src/chain";

//User signup
export const userSignupValidate: Array<ValidationChain> = [
  check("username", "Enter Name").not().isEmpty(),
  check("email", "Enter Email").isEmail().not().isEmpty(),
  check("password", "Enter Password").isLength({ min: 6 }),
];

//User accessCtrl Login
export const LoginValidate: Array<ValidationChain> = [
  check("username", "Enter Name").not().isEmpty(),
  check("password", "Enter Password").isLength({ min: 6 }),
];

//accessCtrl Signup
export const acessControlSignupValidate: Array<ValidationChain> = [
  check("username", "Enter Name").not().isEmpty(),
  check("email", "Enter Email").isEmail().not().isEmpty(),
  check("password", "Enter Password").isLength({ min: 6 }),
  check("role", "Enter role").not().isEmpty(),
];

//User accessCtrl Update passwd
export const updatePasswordValidate: Array<ValidationChain> = [
  check("oldPassword", "Enter Old Password").not().isEmpty(),
  check("newPassword", "Enter New Password").isLength({ min: 6 }),
];

//User forgor passwd
export const forgotPasswordValidate: Array<ValidationChain> = [
  check("email", "Enter Email").isEmail().not().isEmpty(),
];
