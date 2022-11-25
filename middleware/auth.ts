const jwt = require("jsonwebtoken");
import { Request, Response } from "express";

interface IUserRequest extends Request {
  user: {
    cookie: {
      token: string;
    };
    _id: number;
  };
}

exports.isAuthenticated =( SchemaModel: any) => { return async (
  req: IUserRequest,
  res: Response,
  next: any,
) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ message: "Please Login to Access" }] });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await SchemaModel.findById(decodedData.id);
  next();
};
}

exports.hasPermissionRole = (role: Array<string>, SchemaModel: any) => {
  return async (req: IUserRequest, res: Response, next: any) => {
    const user = await SchemaModel.findById(req.user._id).select("role");
    const isTrue = (): boolean => {
      for (let i: number = 0; i < role.length; i++) {
        for (let index: number = 0; index < user.role.length; index++) {
          // console.log(role[i]);
          if (role[i] === user.role[index]) {
            return true;
          }
        }
      }
      return false;
    };

    if (!isTrue()) {
      return res
        .status(401)
        .json({ errors: [{ message: "You didn't have required permission" }] });
    }
    next();
  };
};
