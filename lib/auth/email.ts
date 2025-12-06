import nodemailer from "nodemailer";

let codes: any = {};

export const sendVerificationCode = async (email: string) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codes[email] = code;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Your Verification Code",
    text: "Your verification code is: " + code
  });

  return true;
};

export const verifyCode = async (email: string, code: string) => {
  return codes[email] === code;
};
