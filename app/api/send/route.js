import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EmailTemplate } from "../../_utils/EmailTemplate";

export const POST = async (req) => {
  const { fileName, fileSize, fileType, userEmail, userName, shortUrl, email } =
    await req.json();

  console.log("mail res () : ", fileName);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_AUTHOR,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: email,
      port: 587,
      secure: false,
      subject: "File Shared",
      html: EmailTemplate(
        fileName,
        fileSize,
        fileType,
        userName,
        shortUrl,
        userEmail
      ),
    };

    // Wrap the sendMail function in a Promise for better handling
    const sendMail = () =>
      new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            console.log("Email sent: " + info.response);
            resolve(info);
          }
        });
      });

    // Call the async function to send the email
    const info = await sendMail();

    // Return a successful response
    return NextResponse.json(
      { message: "Mail sent successfully!", info },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    // Return an error response
    return NextResponse.json(
      { message: "Sorry, mail was not sent", error: err },
      { status: 500 }
    );
  }
};
