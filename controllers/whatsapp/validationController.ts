const asyncHandler = require("express-async-handler");
import { Request, Response } from "express";
import { ValidationError } from "express-validator/src/base";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";

const getPhoneNumberByWABAID = asyncHandler(
    async (req: Request, res: Response) => {
      const errors: Result<ValidationError> = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      res.status(200).json({ success: true });
    }
  );
  
  const getPhoneNumberByPhoneID = asyncHandler(
    async (req: Request, res: Response) => {
      const errors: Result<ValidationError> = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      res.status(200).json({ success: true });
    }
  );
  
  const requestOtp = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });
  const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });
  
  const getyWABAID = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });