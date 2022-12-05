const asyncHandler = require("express-async-handler");
import { Request, Response } from "express";
import { ValidationError } from "express-validator/src/base";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";

const getMails = asyncHandler(async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({ success: true });
});
const modifyMailbyID = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });
const getMailbyId = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });

  const insertMail = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });

const sendMail = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });

  const settingMail = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });

  const searchMail = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });
  const getAttachments = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });
export {getMails,sendMail,settingMail,getMailbyId,searchMail };