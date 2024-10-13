import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/axiosInstance"; // Ensure this path is correct
import verifiedEmail from "@/model/verifiedEmail";
import { connectToDB } from "@/utils/ConnectDB";

export async function POST(request) {
  // Added 'async' keyword before the function
  await connectToDB();

  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your preferred email service
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail email address
      pass: process.env.EMAIL_PASS, // Your Gmail app-specific password
    },
  });

  try {
    // Parse the request body
    const { encryptedData } = await request.json(); // Assuming encryptedData is in the body
    const decryptedString = decrypt(encryptedData); // Decrypting the received data
    const data = JSON.parse(decryptedString);
    const { id, fullName, email, message } = data;

    // Validate the data
    if (!id && (!fullName || !email || !message)) {
      return NextResponse.json(
        {
          status: "error",
          statusCode: 400,
          message: "All fields (fullName, email, message) are required",
        },
        { status: 400 }
      );
    }

    let existingItem = null;

    if (id) {
      // If there's an ID, search for the existing item in the database
      existingItem = await verifiedEmail.findById(id);
    }

    if (!existingItem) {
      // If the item does not exist, create a new one
      const newVerifiedEmail = await verifiedEmail.create({
        fullName,
        email,
        message,
      });

      // Construct the email verification URL
      const verificationUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/verified/email/${newVerifiedEmail._id}`;

      // Mail options for sending the verification email
      const mailOptions = {
        from: process.env.EMAIL_USER, // Your email
        to: email, // Send to the user's email
        subject: "New Message from MMZ Tech Solution", // Email subject
        html: `
          <div style="align-self: center; padding: 60px; border-radius: 8px; max-width: 600px; margin: 60px auto; background-color: #ffffff;">
            <div style="text-align: left; margin-bottom: 42px;">
                <img src="https://uploads.tabular.email/u/88f987f4-4b2f-49a3-bfd1-56a8c4319a80/2236dbef-3656-4198-a38b-055016afc803.png" alt="Logo" style="width: 70px;">
            </div>
            <h1 style="font-family: 'Albert Sans', sans-serif; font-weight: 800; color: #333; font-size: 39px; margin-bottom: 16px;">
                Confirm your Email
            </h1>
            <p style="font-family: 'Albert Sans', sans-serif; font-weight: 400; color: #333; font-size: 16px; line-height: 21px; margin-bottom: 20px;">
               Please click the button below to confirm your email address. Only messages sent from verified email addresses will be forwarded to the developer.
            </p>
            <a href="${verificationUrl}" style="display: inline-block; padding: 10px 15px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; font-weight: 700;">
                Verify Email
            </a>
            <p style="font-family: 'Albert Sans', sans-serif; font-weight: 400; color: #333; font-size: 16px; margin-top: 35px;">
                If the button does not work, copy and paste this URL into your browser:
            </p>  
            <p style="color: #007bff; text-decoration: underline;">${verificationUrl}</p>
            <h3 style="font-family: 'Albert Sans', sans-serif;">Full Name: ${fullName}</h3>
            <p>${message}</p>
          </div>
        `, // HTML version with verification button and fallback link
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Return success response with encrypted result
      return NextResponse.json(
        {
          status: "success",
          statusCode: 200,
          message:
            "A verification email has been sent. Please check your inbox.",
          result: encrypt(newVerifiedEmail),
        },
        { status: 200 }
      );
    } else {
      // If the item exists, proceed with sending the message email

      // Email content options for sending the message
      const mailOptions = {
        from: process.env.EMAIL_USER, // Your email
        to: process.env.EMAIL_USER, // Sending email to yourself or a destination email
        subject: "New Message from MMZ Tech Solution", // Email subject
        html: `
         <div style="align-self: center; padding: 60px; border-radius: 8px; max-width: 600px; margin: 60px auto; background-color: #ffffff;">
          <div style="text-align: left; margin-bottom: 42px;">
              <img src="https://uploads.tabular.email/u/88f987f4-4b2f-49a3-bfd1-56a8c4319a80/2236dbef-3656-4198-a38b-055016afc803.png" alt="Logo" style="width: 70px;">
          </div>
          <h1 style="font-family: 'Albert Sans', sans-serif; font-weight: 800; color: #333; font-size: 39px; margin-bottom: 16px;">
              You received a message
          </h1>
         
          <h3 style="font-family: 'Albert Sans', sans-serif;">Full Name: ${existingItem.fullName}</h3>
          <h3 style="font-family: 'Albert Sans', sans-serif;">Email: ${existingItem.email}</h3> <!-- Fixed label from Full Name to Email -->
          <p>${existingItem.message}</p>
      </div>
        `, // HTML version
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Delete the item from the database after sending the email
      await verifiedEmail.findByIdAndDelete(id);

      // Send success response
      return NextResponse.json(
        {
          status: "success",
          statusCode: 200,
          message: "Your message has been sent successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: "Failed to send the email",
      },
      { status: 500 }
    );
  }
}
