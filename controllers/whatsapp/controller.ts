const asyncHandler = require("express-async-handler");
import axios from "axios";
import { Request, Response } from "express";
import { ValidationError } from "express-validator/src/base";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";
const token = 'EAAHoZAiRg5BgBAOIrH4JLMX2xqSwX0xXZCr5gRXb0KGOnaOjZAEuvhCWC466sxGBInaph5A51T8BYdJfiKbSxJ04yZC0pN2YL8ZAfyMovEwB17bB10bwl4syv25hdtYscsnm0s7wWZAcErCMB51ZBpldTfJb4ZCOqmSPnZBv6XhEbQW6wEaorIVWdx7D6delxIEGqSdTZA33jHyqRb8OfO9LgL';
const mytoken = 'aress';
const getWMessages = asyncHandler(async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({ success: true });
});

const sendWMessages = asyncHandler(async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const istext = "";
  const isTextReply = "";
  const isUrl = "";
  const isReaction = "";
  const isImage = "";
  const isImageReply = "";
  const isAudio = "";
  const isAudioReply = "";
  const isDocument = "";
  const isDocumentReply = "";
  const isSticker = "";
  const isStickerReply = "";
  const isVideo = "";
  const isVideoReply = "";
  const isContact = "";
  const isContactReply = "";
  const isLocation = "";
  const isLocationReply = "";
  const isMsgTemplateText = "";
  const isMsgTemplateMedia = "";
  const isMsgTemplateInteractive = "";
  const isListMsg = "";
  const isListMsgReply = "";
  const isReplyButton = "";
  const isSingleProdMsg = "";
  const isMultiProdMsg = "";
  if (istext) {
  } else if (isTextReply) {
  } else if (isUrl) {
  } else if (isReaction) {
  } else if (isImage) {
  } else if (isImageReply) {
  } else if (isAudio) {
  } else if (isAudioReply) {
  } else if (isDocument) {
  } else if (isDocumentReply) {
  } else if (isSticker) {
  } else if (isStickerReply) {
  } else if (isVideo) {
  } else if (isVideoReply) {
  } else if (isContact) {
  } else if (isContactReply) {
  } else if (isLocation) {
  } else if (isLocationReply) {
  } else if (isMsgTemplateText) {
  } else if (isMsgTemplateMedia) {
  } else if (isMsgTemplateInteractive) {
  } else if (isListMsg) {
  } else if (isListMsgReply) {
  } else if (isReplyButton) {
  } else if (isSingleProdMsg) {
  } else if (isMultiProdMsg) {
  }

  res.status(200).json({ success: true });
});

const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({ success: true });
});
const uploadSticker = asyncHandler(async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({ success: true });
});
const getMediaUrl = asyncHandler(async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({ success: true });
});

const downloadMedia = asyncHandler(async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({ success: true });
});

const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({ success: true });
});

const verifyWebhook = asyncHandler(async (req: Request, res: Response) => {
  // const errors: Result<ValidationError> = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  let mode = req.query["hub.mode"];
  let challange = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
     return res.status(200).send(challange);
    } else {
     return res.status(403);
    }
  }
});

const sendM = asyncHandler(async (req: Request, res: Response) => {
  let body_param = req.body;

  console.log(JSON.stringify(body_param, null, 2));

  if (body_param.object) {
    console.log("inside body param");
    if (
      body_param.entry &&
      body_param.entry[0].changes &&
      body_param.entry[0].changes[0].value.messages &&
      body_param.entry[0].changes[0].value.messages[0]
    ) {
      let phon_no_id =
        body_param.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body_param.entry[0].changes[0].value.messages[0].from;
      let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

      console.log("phone number " + phon_no_id);
      console.log("from " + from);
      console.log("boady param " + msg_body);

      axios({
        method: "POST",
        url:
          "https://graph.facebook.com/v13.0/" +
          phon_no_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: {
            body: "Hi.. I'm Prasath, your message is " + msg_body,
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

    return  res.sendStatus(200);
    } else {
    return  res.sendStatus(404);
    }
  }

 return res.status(200).json({ success: true });
});
export { getWMessages, sendWMessages,verifyWebhook,sendM };


