const express = require("express");
import { sendM,verifyWebhook } from "../controllers/whatsapp/controller";


const router = express();

router.route("/webhook").get(verifyWebhook);
router.route("/sendMsg").post(sendM);


module.exports = router;
