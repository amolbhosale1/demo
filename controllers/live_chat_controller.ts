import { Request, Response, NextFunction } from "express";
const asyncHandler = require("express-async-handler");
var fs = require("fs");
var path = require("path");

const Chat = require("../models/live_chat_model");
const Message = require("../models/messageModel");


interface IMessageRequest extends Request {
  params: {
    chatId: string;
  };
  file: {
    filename: string;
  };
  user: {
    _id: number;
  };
}
interface IUserRequest extends Request {
  user: {
    _id: number;
    email: String;
  };
}

// Create New Chat
const newChat = asyncHandler(async (req: IUserRequest, res: Response) => {
  const chatExists = await Chat.findOne({
    users: {
      $all: [req.user._id, req.body.receiverId],
    },
  });

  if (chatExists) {
    return res.status(200).json({
      success: true,
      newChat: chatExists,
    });
  }

  const newChat = await Chat.create({
    users: [req.user._id, req.body.receiverId],
  });

  res.status(200).json({
    success: true,
    newChat,
  });
});

// Get All Chats
const getChats = asyncHandler(async (req: IUserRequest, res: Response) => {
  const chats = await Chat.find({
    users: {
      $in: [req.user._id],
    },
  })
    .sort({ updatedAt: -1 })
    .populate("users latestMessage");

  res.status(200).json({
    success: true,
    chats,
  });
});

const newMessage = asyncHandler(
  async (req: IMessageRequest, res: Response) => {
    const { chatId, content } = req.body;
    let img;
    if (req.file) {
       img = {
        data: fs.readFileSync(
          path.join(__dirname, "../" + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      };
    }
    const msgData = {
      sender: req.user._id,
      chatId,
      content,
      img
    };

    const newMessage = await Message.create(msgData);

    await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });

    res.status(200).json({
      success: true,
      newMessage,
    });
  }
);

// Get All Messages
const getMessages = asyncHandler(
  async (req: IMessageRequest, res: Response) => {
    const messages = await Message.find({
      chatId: req.params.chatId,
    });

    res.status(200).json({
      success: true,
      messages,
    });
  }
);

export {newChat,getChats,newMessage,getMessages}
