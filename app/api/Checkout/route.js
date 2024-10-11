import { NextResponse } from "next/server";
import midtransClient from "midtrans-client"; // Ensure you're importing this correctly
import api, { decrypt } from "@/utils/axiosInstance";

export async function POST(request) {
  try {
    // Decrypt the incoming encrypted data
    const { encryptedData } = await request.json();
    const decryptedString = decrypt(encryptedData);
    const { id } = JSON.parse(decryptedString);

    console.log("Decrypted data (id):", id);

    // Call the package service API to get the price
    const packageServiceResponse = await api.get(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/packageService/getById?id=${id}`
    );

    console.log("API response status:", packageServiceResponse.status);
    console.log("API response data:", packageServiceResponse.data);

    // Check the statusCode inside the response data
    if (packageServiceResponse.data.statusCode !== 200) {
      return NextResponse.json({
        status: 500,
        message: "Failed to fetch package price",
      });
    }

    const packageData = packageServiceResponse.data.result;
    const packagePrice = packageData?.hargaService; // Adjust according to your API response structure

    console.log("Package Price:", packagePrice);

    // Validate packagePrice
    if (!packagePrice || isNaN(packagePrice)) {
      return NextResponse.json({
        status: 500,
        message: "Invalid package price",
      });
    }

    // Create Snap API instance for Midtrans transaction
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: crypto.randomUUID(), // Generates a unique order ID
        gross_amount: packagePrice, // Using the fetched package price
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: "mockTest",
        last_name: "mockTest",
        email: "mockTest@example.com",
        phone: "081112223333",
      },
    };

    // Create transaction
    const transaction = await snap.createTransaction(parameter);
    const redirectUrl = transaction.redirect_url;

    return NextResponse.json({ redirectUrl });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred while processing your request",
    });
  }
}
