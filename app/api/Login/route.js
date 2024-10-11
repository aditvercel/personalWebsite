import { connectToDB } from "@/utils/ConnectDB";
import user from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the incoming JSON request
    const { userName, password } = await request.json();

    // Connect to the database
    await connectToDB();

    // Find the user by username
    const foundUser = await user.findOne({ userName });

    if (!foundUser) {
      // Return 404 if user is not found
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare the plain-text password
    if (foundUser.password !== password) {
      // Return 401 if password doesn't match
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Login successful, return user data
    return NextResponse.json({ message: "Login successful", user: foundUser });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
