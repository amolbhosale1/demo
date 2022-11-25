import fs from "fs";
import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import path from "path";
const handlebars = require("hbs");
interface Ioptions {
  email: String;
  data: {
    reset_url: string
    name:string
  };
}

var source = fs.readFileSync(
  path.join(__dirname, "../", "views/emailTemplate.hbs"),
  "utf8"
);
// Create email generator
var template = handlebars.compile(source);

var transport = createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8f3b2025c03d61",
    pass: "ef2275a156a9a7",
  },
});

const sendEmail = async (options: Ioptions) => {
  let emailTemplateBody = {
    name: options.data.name,
    link: options.data.reset_url,
  };
  var mailOptions = {
    from: '"Example Team" <from@example.com>',
    to: `${options.email}`,
    subject: "password reset",
    text: options.data.reset_url,
    html: template({ projects: emailTemplateBody }),
  };
  transport.sendMail(
    mailOptions,
    (error: Error | null, info: SMTPTransport.SentMessageInfo) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    }
  );
};

module.exports = sendEmail;
