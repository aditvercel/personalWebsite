import { connectToDB } from "@/utils/ConnectDB";
import query from "@/model/query";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/axiosInstance";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// PUT request handler
export async function PUT(request) {
  await connectToDB();
  try {
    const { encryptedData } = await request.json();
    const decryptedString = decrypt(encryptedData);
    const { id, image, cv, ...updateData } = JSON.parse(decryptedString);

    // Find the existing item
    const existingItem = await query.findById(id);
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

    // Check if the cv has changed
    if (cv && cv !== existingItem.cv) {
      // If the existing item has an cv, delete it from Cloudinary
      if (existingItem.cv) {
        const publicId = existingItem.cv.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new cv to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(cv, {
        upload_preset: "ml_default",
      });
      updateData.cv = uploadResponse.secure_url; // Set the cv to the returned URL
    }

    if (image && image !== existingItem.image) {
      // If the existing item has an image, delete it from Cloudinary
      if (existingItem.image) {
        const publicId = existingItem.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "ml_default",
      });
      updateData.image = uploadResponse.secure_url; // Set the image to the returned URL
    } else {
      // If the image hasn't changed, keep the existing image
      updateData.image = existingItem.image;
    }

    // Update the item with the new data
    const updatedItem = await query.findByIdAndUpdate(id, updateData, {
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
