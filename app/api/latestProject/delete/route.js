import { connectToDB } from "@/utils/ConnectDB";
import latestProject from "@/model/latestProject";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/axiosInstance";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// DELETE request handler
export async function DELETE(request) {
  await connectToDB();
  try {
    // Extract the encrypted data from the request body
    const { encryptedData } = await request.json();
    const decryptedString = decrypt(encryptedData);
    const { id } = JSON.parse(decryptedString);

    // Find the item to delete
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
