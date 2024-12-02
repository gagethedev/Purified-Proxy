import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config()

let transporter;

export const initNodeMailer = async () => {
  const AUTH_SMTP_USER = process.env.AUTH_SMTP_USER;
  const AUTH_SMTP_HOST = process.env.AUTH_SMTP_HOST
  const AUTH_SMTP_PASSWORD = process.env.AUTH_SMTP_PASSWORD;
  const AUTH_SMTP_PORT = process.env.AUTH_SMTP_PORT;

  if (!AUTH_SMTP_USER || !AUTH_SMTP_HOST || !AUTH_SMTP_PASSWORD || !AUTH_SMTP_PORT) throw new Error("Missing SMTP environment variables");

  const _transporter = nodemailer.createTransport({
    host: AUTH_SMTP_HOST,
    port: AUTH_SMTP_PORT,
    secure: true,
    tls: { minVersion: 'TLSv1.1' },
    auth: {
      user: AUTH_SMTP_USER,
      pass: AUTH_SMTP_PASSWORD
    }
  });

  transporter = _transporter;
  console.log("SMTP Starting...");
  transporter.verify().then(() => {
    console.log("SMTP Loaded.")
    return true;
  }
  ).catch(e => {
    console.error(e);
    return false;
  });
};