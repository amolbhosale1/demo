import express from "express";
const router = express();
const AccessControlModel = require("../models/access_control_model");
import {
  newChat,
  getChats,
  newMessage,
  getMessages,
} from "../controllers/live_chat_controller";
import grantList from "../models/access_control_LIst";
const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");

router
  .route("/newChat")
  .post(
    isAuthenticated,
    hasPermissionRole([grantList.liveCreate.role], AccessControlModel),
    newChat
  );

router
  .route("/chats")
  .get(
    isAuthenticated(AccessControlModel),
    hasPermissionRole([grantList.liveRead.role], AccessControlModel),
    getChats
  );

router.route("/newMessage").post(isAuthenticated,
  hasPermissionRole([grantList.liveCreate.role], AccessControlModel), newMessage);
router.route("/messages/:chatId").get(isAuthenticated,
  hasPermissionRole([grantList.liveRead.role], AccessControlModel), getMessages);

module.exports = router;
