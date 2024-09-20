// app/api/register_barang/route.js
import { connectToDB } from "@/utils/ConnectDB";
import latestProject from "@/model/latestProject";
import { NextResponse } from "next/server";

// GET request handler
export async function GET(request) {
  await connectToDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Extract the ID from query parameters

  try {
    if (id) {
      // If an ID is provided, return the single item
      const item = await latestProject.findById(id);

      if (!item) {
        return NextResponse.json({
          status: 404,
          message: "Item not found",
        });
      }

      return NextResponse.json({
        status: 200,
        message: "Item retrieved successfully",
        item,
      });
    } else {
      // If no ID is provided, return all items
      let res = await latestProject.find();
      return NextResponse.json({
        status: 200,
        message: "Success",
        items: res,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: error._message || "Server error",
    });
  }
}

// POST request handler
export async function POST(request) {
  await connectToDB();
  try {
    const data = await request.json(); // Extract JSON data from the request
    const newItem = await latestProject.create(data);
    console.log(data);
    return NextResponse.json({
      status: 201,
      message: "Item created successfully",
      item: newItem,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: error._message || "Server error",
    });
  }
}

// PUT request handler for updating an item
export async function PUT(request) {
  await connectToDB();
  try {
    const { id, ...updateData } = await request.json(); // Extract JSON data from the request
    const updatedItem = await latestProject.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return NextResponse.json({
        status: 404,
        message: "Item not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: error._message || "Server error",
    });
  }
}

// DELETE request handler for deleting an item
export async function DELETE(request) {
  await connectToDB();
  try {
    const { id } = await request.json(); // Extract JSON data from the request
    const deletedItem = await latestProject.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json({
        status: 404,
        message: "Item not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Item deleted successfully",
      item: deletedItem,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: error._message || "Server error",
    });
  }
}
