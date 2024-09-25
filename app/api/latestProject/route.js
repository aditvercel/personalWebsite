import { connectToDB } from "@/utils/ConnectDB";
import latestProject from "@/model/latestProject";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/axiosInstance";

// GET request handler
export async function GET(request) {
  await connectToDB();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
  const pageSize = 6; // Define the number of items per page
  const id = searchParams.get("id");

  try {
    // Fetch a single item by ID
    if (id) {
      const item = await latestProject.findById(id);
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
        },
        { status: 200 }
      );
    } else {
      // Filter by category if provided
      const query = category ? { category } : {};

      // Pagination and filtering
      const items = await latestProject
        .find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      // Total count for pagination
      const totalCount = await latestProject.countDocuments(query);
      const totalPages = Math.ceil(totalCount / pageSize);

      return NextResponse.json(
        {
          status: "success",
          statusCode: 200,
          message: "Items retrieved successfully",
          result: encrypt(items),
          totalPages, // Send total pages to the frontend for pagination
          currentPage: page,
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

// POST request handler
export async function POST(request) {
  console.log(request);
  await connectToDB();
  try {
    // Extract the encrypted data from the request body
    const { encryptedData } = await request.json(); // Assuming encryptedData is in the body

    // Decrypt the data
    const decryptedString = decrypt(encryptedData); // decryptedString will be a JSON string

    // Parse the decrypted string into an object
    const data = JSON.parse(decryptedString);

    // Create new item with decrypted data
    const newItem = await latestProject.create(data);

    // Encrypt the response
    return NextResponse.json(
      {
        status: "success",
        statusCode: 200,
        message: "Item created successfully",
        result: encrypt(newItem), // Encrypting new item
      },
      { status: 200 }
    );
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

// PUT request handler
export async function PUT(request) {
  await connectToDB();
  try {
    // Extract the encrypted data from the request body
    const { encryptedData } = await request.json(); // Assuming encryptedData is in the body

    // Decrypt the data
    const decryptedString = decrypt(encryptedData); // decryptedString will be a JSON string

    // Parse the decrypted string into an object
    const { id, ...updateData } = JSON.parse(decryptedString);

    // Find and update the item
    const updatedItem = await latestProject.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
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
        message: "Item updated successfully",
        result: encrypt(updatedItem), // Encrypting updated item
      },
      { status: 200 }
    );
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

// DELETE request handler
export async function DELETE(request) {
  await connectToDB();
  try {
    // Extract the encrypted data from the request body
    const { encryptedData } = await request.json(); // Assuming encryptedData is in the body

    // Decrypt the data
    const decryptedString = decrypt(encryptedData); // decryptedString will be a JSON string

    // Parse the decrypted string into an object
    const { id } = JSON.parse(decryptedString);

    // Find and delete the item
    const deletedItem = await latestProject.findByIdAndDelete(id);

    if (!deletedItem) {
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
        message: "Item deleted successfully",
        result: encrypt(deletedItem), // Encrypting deleted item
      },
      { status: 200 }
    );
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
