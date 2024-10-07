import { connectToDB } from "@/utils/ConnectDB";
import mySkills from "@/model/mySkills";
import { NextResponse } from "next/server";
import { encrypt, decrypt } from "@/utils/axiosInstance";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const newItem = await mySkills.create(data);

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
