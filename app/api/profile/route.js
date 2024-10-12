import { connectToDB } from "@/utils/ConnectDB";
import profile from "@/model/profile";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/axiosInstance";

// GET request handler
export async function GET(request) {
  await connectToDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const item = await profile.findById(id);
      if (!item) {
        return NextResponse.json(
          {
            status: "error",
            statusCode: 404,
            message: "Item not found",
          },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          status: "success",
          statusCode: 200,
          message: "Item retrieved successfully",
          result: encrypt(item), // Encrypting single item
        },
        { status: 200 }
      );
    } else {
      const items = await profile.find();
      return NextResponse.json(
        {
          status: "success",
          statusCode: 200,
          message: "Items retrieved successfully",
          result: encrypt(items), // Encrypting items correctly
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
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
