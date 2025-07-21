// lib/mailer.ts

import nodemailer from "nodemailer";

export const sendDeliveryEmail = async (recipientEmail: string, zipLink: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"RMP Delivery" <${process.env.EMAIL_FROM}>`,
    to: recipientEmail,
    subject: "Your RMP Product Download Link",
    html: `
      <div style="font-family: Arial, sans-serif; color: #111;">
        <h2>✅ Your RMP License Delivery</h2>
        <p>Thank you for purchasing our Request Management Portal!</p>
        <p>Your download link: <a href="${zipLink}" target="_blank">${zipLink}</a></p>
        <p>If you have any questions, just reply to this email.</p>
        <br>
        <strong>– Team RMP</strong>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};