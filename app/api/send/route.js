import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EmailTemplate } from "../../_utils/EmailTemplate";

export const POST = async (req) => {
    const { fileName,
        fileSize,
        fileType,
        userEmail,
        userName,
        shortUrl,
        email } = await req.json();
    
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

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        return NextResponse.json(
          { message: "Sorry, mail was not sent" },
          { status: 400 }
        );
      } else {
        console.log("Email sent: " + info.response);
        return NextResponse.json(
          { message: "Mail sent successfully!" },
          { status: 200 }
        );
      }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }

  // Return a response in case there are no asynchronous errors
  return NextResponse.json(
    { message: "Operation completed successfully" },
    { status: 200 }
  );
};
