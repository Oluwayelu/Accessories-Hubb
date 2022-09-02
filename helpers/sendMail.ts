import nodemailer from "nodemailer";
import type { SendEmailOptions } from "interface";

const sendEmail: Function = async (options: SendEmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.STMP_FROM_NAME} < ${process.env.STMP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

export default sendEmail;
