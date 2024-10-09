import { connectToDB } from "@/utils/ConnectDB";
import faq from "@/model/faq";
import { NextResponse } from "next/server";
import { encrypt } from "@/utils/axiosInstance";

// GET request handler
export async function GET(request) {
  await connectToDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    // Fetch a single item by ID
    if (id) {
      const item = await faq.findById(id);
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
          result: encrypt(item), // Encrypt the result
        },
        { status: 200 }
      );
    } else {
      // Return an error if no id is provided
      return NextResponse.json(
        {
          status: "error",
          statusCode: 400,
          message: "ID is required",
        },
        { status: 400 }
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
