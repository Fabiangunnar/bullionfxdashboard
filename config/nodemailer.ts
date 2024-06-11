// create reusable transporter object using the default SMTP transport
import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid-transport";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;
console.log(email, pass);
export let transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: `${pass}`,
    },
  })
);

export const mailOptions = {
  from: email,
};
