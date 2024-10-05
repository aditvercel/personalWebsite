import { connectToDB } from "@/utils/ConnectDB";
import journey from "@/model/journey";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/axiosInstance";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  await connectToDB();
  try {
    const { encryptedData } = await request.json();
    const decryptedString = decrypt(encryptedData);
    const data = JSON.parse(decryptedString);

    // Upload image to Cloudinary
    if (data.image) {
      const uploadResponse = await cloudinary.uploader.upload(data.image, {
        upload_preset: "ml_default", // Use your upload preset
      });
      data.image = uploadResponse.secure_url; // Set the image to the returned URL
    }

    // Create new item with decrypted data
    console.log(data, "datanya");
    const newItem = await journey.create(data);

    return NextResponse.json(
      {
        status: "success",
        statusCode: 200,
        message: "Item created successfully",
        result: encrypt(newItem),
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
    const { encryptedData } = await request.json();
    const decryptedString = decrypt(encryptedData);
    const { id, ...updateData } = JSON.parse(decryptedString);

    // Find the existing item
    const existingItem = await journey.findById(id);
    if (!existingItem) {
      return NextResponse.json(
        {
          status: "error",
          statusCode: 404,
          message: "Item not found",
        },
        { status: 404 }
      );
    }

    // Upload new image to Cloudinary if it exists and delete the old image
    if (updateData.image) {
      if (existingItem.image) {
        // Extract public_id from the old image URL and delete it
        const publicId = existingItem.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new image
      const uploadResponse = await cloudinary.uploader.upload(
        updateData.image,
        {
          upload_preset: "ml_default",
        }
      );
      updateData.image = uploadResponse.secure_url; // Set the image to the returned URL
    }

    // Update the item with the new data
    const updatedItem = await journey.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      {
        status: "success",
        statusCode: 200,
        message: "Item updated successfully",
        result: encrypt(updatedItem),
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
    const { encryptedData } = await request.json();
    const decryptedString = decrypt(encryptedData);
    const { id } = JSON.parse(decryptedString);

    // Find the item to delete
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

    // Delete the image from Cloudinary if it exists
    if (deletedItem.image) {
      const publicId = deletedItem.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    return NextResponse.json(
      {
        status: "success",
        statusCode: 200,
        message: "Item deleted successfully",
        result: encrypt(deletedItem),
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
