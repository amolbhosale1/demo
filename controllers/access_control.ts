import { AccessControl } from "accesscontrol";
import grantList from "../models/access_control_LIst";
const asyncHandler = require("express-async-handler");
const sendCookie = require("../utils/sendCookie");
import { Request, Response, NextFunction } from "express";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";
const AccessControlModel = require("../models/access_control_model");
import { ValidationError } from "express-validator/src/base";

interface IUserRequest extends Request {
  user: {
    _id: number;
    email: String;
  };
}

const access_control = async () => {
  // const ac: AccessControl = await new AccessControl(grantList);
  // console.log(ac.can('whatsapp_create').createAny('chat').granted);    // —> true
};

exports.IamsignupUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password, role } = req.body;
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await AccessControlModel.findOne({
    $or: [{ email }, { username }],
  });
  if (user) {
    if (user.username === username) {
      return res
        .status(401)
        .json({ errors: [{ message: "User already exist" }] });
    }
    return res
      .status(401)
      .json({ errors: [{ message: "Email already exist" }] });
  }

  const newUser = await AccessControlModel.create({
    email,
    username,
    password,
    role,
  });
  sendCookie(newUser, 201, res);
});

// Login User
exports.IamloginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await AccessControlModel.findOne({
    $or: [{ email: username }, { username: username }],
  }).select("+password");

  if (!user) {
    return res
      .status(401)
      .json({ errors: [{ message: "User doesn't exist" }] });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res
      .status(401)
      .json({ errors: [{ message: "Password doesn't match" }] });
  }

  sendCookie(user, 201, res);
});

// Logout User
exports.IamlogoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  }
);

//get me
exports.IamgetAccountDetails = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const user = await AccessControlModel.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  }
);

exports.IamdeleteProfile = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const { id } = req.body;

    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await AccessControlModel.findOneAndDelete(id);

    await user.remove();

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  }
);

//update paswd from admin panel only by admin
exports.IamupdatePassword = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const { oldPassword, newPassword, _id } = req.body;

    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await AccessControlModel.findById(_id).select("+password");

    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ errors: [{ message: "Old password not match" }] });
    }

    user.password = newPassword;
    await user.save();
    sendCookie(user, 201, res);
  }
);

//get all users
exports.IamgetAllUsers = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const users = await AccessControlModel.find();

    res.status(200).json({
      success: true,
      users,
    });
  }
);

//search users
exports.IamsearchUsers = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    if (req.query.keyword) {
      const users = await AccessControlModel.find({
        $or: [
          {
            username: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      });

      res.status(200).json({
        success: true,
        users,
      });
    }
  }
);

exports.IamgetUserDetailsById = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const user = await AccessControlModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
  }
);

export default access_control;
