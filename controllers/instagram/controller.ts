const asyncHandler = require("express-async-handler");
import { Request, Response } from "express";
import { ValidationError } from "express-validator/src/base";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";

const getMsgUsers = asyncHandler(async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({ success: true });
});
const getMsgUsersbyID = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });
const getMsgId = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });

const msgInfo = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });

  const profile = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    res.status(200).json({ success: true });
  });

  const sendMsg = asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const isText = "";
    const isLink = "";
    const isMedia = "";
    const isMediabyUrl = "";
    const isSticker = "";
    
    if (isText || isLink) {
        
    }else if (isMedia) {
        
    }else if (isMediabyUrl) {
    
        // media by url
    }else if(isSticker){

    }
  
    res.status(200).json({ success: true });
  });
  