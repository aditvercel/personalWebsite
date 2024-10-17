import { connectToDB } from "@/utils/ConnectDB";
import message from "@/model/message";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/axiosInstance";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

export async function POST(request) {
  try {
    // Step 1: Connect to the database
    await connectToDB();
    console.log("Database connection established");

    // Step 2: Parse and decrypt the request
    const { encryptedData } = await request.json();
    const decryptedString = decrypt(encryptedData);
    const data = JSON.parse(decryptedString);
    console.log("Decrypted data:", data);
    // { sender: 'User123', content: 'test', room: 'general' }

    // Step 3: Validate the input data
    const { room, sender, content, image } = data;

    if (!room || !sender || !content) {
      console.error("Missing required fields:", {
        room,
        sender,
        content,
        image,
      });
      throw new Error("Missing required fields: room, sender, or content");
    }

    // Step 4: Save the message to the database
    const newmessage = await message.create({ room, sender, content, image });
    console.log("message saved to the database:", newmessage);

    // Step 5: Trigger Pusher to broadcast the message
    await pusher.trigger(`room-${room}`, "message", {
      sender,
      content,
      image,
      timestamp: newmessage.timestamp,
    });
    console.log("message broadcast via Pusher");

    // Step 6: Return the encrypted response with the saved message
    return NextResponse.json(
      {
        status: "success",
        statusCode: 200,
        message: "message sent successfully",
        result: encrypt(newmessage),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred:", error);

    // Step 7: Return a 500 error response if something goes wrong
    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}
