const User = require("../models/user_model");
const asyncHandler = require("express-async-handler");
const sendCookie = require("../utils/sendCookie");
import { createHash } from "crypto";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validator/src/base";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";
const sendEmail = require("../utils/sendEmail");

interface IUserRequest extends Request {
  user: {
    _id: number;
    email: String;
  };
}
// Signup User
exports.signupUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await User.findOne({
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

  const newUser = await User.create({
    email,
    username,
    password,
  });
  sendCookie(newUser, 201, res);
});

// Login User
exports.loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, otp } = req.body;
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await User.findOne({
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

  const generateOtp = await user.getOtp();
console.log(generateOtp);
  
  await user.save();

  // try {
  //   await sendEmail({
  //     email: user.email,
  //     data: {
  //       generateOtp,
  //     },
  //   });

  //   res.status(200).json({
  //     success: true,
  //     message: `Email sent to ${user.email}`,
  //   });
  // } catch (error) {
  //   user.otpToken = undefined;
  //   user.otpExpiry = undefined;

  //   await user.save({ validateBeforeSave: false });
  //   return res.status(500).json({ errors: [{ message: error }] });
  // }
  res.status(200).send("Login First step done");
});

// Logout User
exports.logoutUser = asyncHandler(
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
exports.getAccountDetails = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  }
);

//update paswd by own
exports.updatePassword = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const { oldPassword, newPassword } = req.body;

    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user._id).select("+password");

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

//forgot passwd by link
exports.forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!user) {
    return res.status(404).json({ errors: [{ message: "User not found" }] });
  }

  const resetPasswordToken = await user.getResetPasswordToken();

  await user.save();

  const resetPasswordUrl = `https://${req.get(
    "host"
  )}/password/reset/${resetPasswordToken}`;

  try {
    await sendEmail({
      email: user.email,
      data: {
        name: user.username,
        reset_url: resetPasswordUrl,
      },
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ errors: [{ message: error }] });
  }
});

//reset passwd
exports.resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const resetPasswordToken = createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).json({ errors: [{ message: "User not found" }] });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendCookie(user, 200, res);
});

exports.deleteProfile = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const user = await User.findOneAndDelete(req.user._id);

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

exports.verifyOtp = asyncHandler(async (req: IUserRequest, res: Response) => {
  const { otp, username } = req.body;

  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const user = await User.findOne({
    $or: [{ email: username }, { username: username }],
  }).select("+password");
  const isOtpMatched = await user.compareOtp(otp);
  if (!isOtpMatched) {
    return res.status(401).json({ errors: [{ message: "Otp doesn't match" }] });
  }

  sendCookie(user, 201, res);
});
