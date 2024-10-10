import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/axiosInstance"; // Ensure this path is correct
import verifiedEmail from "@/model/verifiedEmail";
import { connectToDB } from "@/utils/ConnectDB";

// POST request to send an email
export async function POST(request) {
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
        subject: "Verify your email to send messages", // Email subject
        html: `
            <h3>fullName :${fullName}</h3>
            <p>${message}</p>
            <p>Please verify your email by clicking the button below:</p>
            <a href="${verificationUrl}" style="padding: 10px 15px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>If the button does not work, copy and paste this URL into your browser:</p>
            <p><a href="${verificationUrl}">${verificationUrl}</a></p>
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
        subject: "New Message from Adityamms Personal website", // Email subject
        html: `<h3>You received a message from ${existingItem.fullName} (${existingItem.email})</h3><p>${existingItem.message}</p>`, // HTML version
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
