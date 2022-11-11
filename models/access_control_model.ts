import { model, Schema, Document } from "mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export interface AccessControlDocument extends Document {
  username: string;
  email: String;
  password: string;
  role: String[];
}
const access_control_Schema = new Schema<AccessControlDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please enter Passowrd"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  role: {
    type: [String],
    required: [true, "Please enter role"],
  },
});

access_control_Schema.pre(
  "save",
  async function (this: AccessControlDocument, next) {
    ``;
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  }
);

access_control_Schema.methods.comparePassword = async function (
  enteredPassword: String
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

access_control_Schema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = model<AccessControlDocument>(
  "Access_contorl_Model",
  access_control_Schema
);
