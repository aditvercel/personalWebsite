import { connectToDB } from "@/utils/ConnectDB"; // Ensure this path is correct
import message from "@/model/message"; // Import your message model
import { NextResponse } from "next/server";
import { encrypt } from "@/utils/axiosInstance";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const room = searchParams.get("room");

  try {
    // Step 1: Connect to the database
    await connectToDB();
    console.log("Database connection established");

    // Step 2: Validate the room parameter
    if (!room) {
      return NextResponse.json(
        { status: "error", message: "Room parameter is required." },
        { status: 400 }
      );
    }

    // Step 3: Fetch messages for the specified room
    const messages = await message.find({ room }).sort({ timestamp: 1 }).exec();

    console.log(`Fetched ${messages.length} messages for room: ${room}`);

    // Step 4: Return the messages in response
    const formattedMessages = messages.map((msg) => ({
      sender: msg.sender,
      content: msg.content,
      timestamp: msg.timestamp,
      image: msg.image,
    }));

    return NextResponse.json({
      status: "success",
      messages: encrypt(formattedMessages),
    });
  } catch (error) {
    console.error("Error occurred while fetching messages:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
