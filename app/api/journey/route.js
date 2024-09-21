import { connectToDB } from "@/utils/ConnectDB";
import journey from "@/model/journey";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/axiosInstance";

// GET request handler
export async function GET(request) {
  await connectToDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
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
          result: encrypt(item), // Encrypting single item
        },
        { status: 200 }
      );
    } else {
      const items = await journey.find();
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
    const newItem = await journey.create(data);

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
    const updatedItem = await journey.findByIdAndUpdate(id, updateData, {
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
    const deletedItem = await journey.findByIdAndDelete(id);

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
