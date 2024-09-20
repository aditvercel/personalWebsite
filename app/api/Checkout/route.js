import { NextResponse } from "next/server";
import midtransClient from "midtrans-client"; // Ensure you're importing this correctly
import fetch from "node-fetch"; // If using node-fetch

export async function POST(request) {
  const { total, id } = await request.json();
  // Call the package service API to get the price
  let packageServiceResponse;
  try {
    packageServiceResponse = await fetch(
      `https://your-package-service-api.com/packages/${id}`
    );
    if (!packageServiceResponse.ok) {
      throw new Error("Failed to fetch package price");
    }

    const packageData = await packageServiceResponse.json();
    const packagePrice = packageData.price; // Adjust this according to your API response structure

    // Optionally, you can compare total and packagePrice here
    console.log("Package Price:", packagePrice);

    // Create Snap API instance
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: crypto.randomUUID(),
        gross_amount: packagePrice, // You can adjust this if necessary
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: "mockTest",
        last_name: "Testmock",
        email: "mockTest@example.com",
        phone: "081112223333",
      },
    };

    try {
      let transaction = await snap.createTransaction(parameter);
      let redirectUrl = transaction.redirect_url;
      return NextResponse.json({ redirectUrl });
    } catch (error) {
      console.error("Error creating transaction:", error);
      return NextResponse.json({
        status: 500,
        message: "Failed to create transaction",
      });
    }
  } catch (error) {
    console.error("Error fetching package price:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch package price",
    });
  }
}
