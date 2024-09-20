import { connectToDB } from "@/utils/ConnectDB";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectToDB();
  try {
    // Parse the request body to get user login credentials
    const { UserName, Password } = await request.json();

    // Query the database to check if the user exists
    const user = await User.findOne({ UserName });

    if (!user) {
      // User not found
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the provided password matches the stored password
    if (user.Password !== Password) {
      // Password doesn't match
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // If username and password match, you can consider the user logged in
    return NextResponse.json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
