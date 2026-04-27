import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Domain Added ",
      text: `Updated Domain Added:
      
      Updated Domain: ${data.updatedDomain}
      Old Domain: ${data.oldDomain || "N/A"}
      Full URL: ${data.fullUrl}
      User Agent: ${data.userAgent}
      Created At: ${data.createdAt}`,
    });

    console.log("Email sent ");
  } catch (error) {
    console.error("Email error:", error.message);
  }
};