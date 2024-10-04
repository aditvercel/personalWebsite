import { connectToDB } from "@/utils/ConnectDB";
import journey from "@/model/journey";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/axiosInstance";

// GET request handler
export async function GET(request) {
  await connectToDB();

  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category");
  const category =
    categoryParam && !isNaN(parseInt(categoryParam))
      ? parseInt(categoryParam)
      : null; // Ensure it's a valid number or null
  const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(searchParams.get("pageSize")) || 10; // Allow pageSize to be specified in query params (default to 6)
  const search = searchParams.get("search") || ""; // Get the search query from query params
  const id = searchParams.get("id");

  try {
    // Fetch a single item by ID
    if (id) {
      const item = await journey.findById(id);
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
          result: encrypt(item),
          //   result: item,
        },
        { status: 200 }
      );
    } else {
      // Build the query object
      const query = {
        ...(category !== null && { category }), // Filter by category only if it's valid (not null)
        ...(search && {
          $or: [
            // Search functionality
            { title_1: { $regex: search, $options: "i" } }, // Case-insensitive search in 'title'
            { description_1: { $regex: search, $options: "i" } }, // Case-insensitive search in 'description'
            { description_2: { $regex: search, $options: "i" } },
            // { year: { $regex: search, $options: "i" } },
          ],
        }),
      };

      // Pagination and filtering
      const items = await journey
        .find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      // Total count for pagination
      const totalCount = await journey.countDocuments(query);
      const totalPages = Math.ceil(totalCount / pageSize);

      return NextResponse.json(
        {
          status: "success",
          statusCode: 200,
          message: "Items retrieved successfully",
          result: encrypt({
            items: [...items],
            totalPages, // Total pages for frontend pagination
            currentPage: page, // Current page
          }),
          //   result: {
          //     items: [...items],
          //     totalPages, // Total pages for frontend pagination
          //     currentPage: page, // Current page
          //   },
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
