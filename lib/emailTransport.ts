import nodemailer from "nodemailer";

const SMTP_PORT = Number(process.env.EMAIL_PORT ?? 465);

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

export function getEmailUser() {
  const user = process.env.EMAIL_USER;
  if (!user) throw new Error("Missing EMAIL_USER environment variable");
  return user;
}

export function getEmailTransporter() {
  if (!transporter) {
    const user = getEmailUser();
    const pass = process.env.EMAIL_PASS;
    if (!pass) throw new Error("Missing EMAIL_PASS environment variable");

    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST ?? "smtp.titan.email",
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user, pass },
    });
  }

  return transporter;
}
