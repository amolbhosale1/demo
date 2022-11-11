const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface Ioptions {
  email: String;
  templateId: String | undefined;
  data: {
    reset_url: string;
  };
}
const sendEmail = async (options: Ioptions) => {
  const msg = {
    to: options.email,
    from: process.env.SENDGRID_MAIL,
    templateId: options.templateId,
    dynamic_template_data: options.data,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email Sent");
    })
    .catch((error: Error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
