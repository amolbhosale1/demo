import { model, Schema, Document } from "mongoose";
import { createHash, randomBytes } from "node:crypto";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpiry: Date;
  isVerified: boolean;
  expires?: Date;
  role: String[];

  comparePassword(password: string): boolean;
  // generateToken(): Promise<string>;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date, default: Date.now },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: [String],
      required: true,
      default: ["admin"],
    },
    expires: { type: Date, default: Date.now, expires: 432000 },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: UserDocument, next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: String) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = randomBytes(20).toString("hex");

  this.resetPasswordToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = model<UserDocument>("User", userSchema);
