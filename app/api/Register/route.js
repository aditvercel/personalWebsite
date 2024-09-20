import { connectToDB } from "@/utils/ConnectDB";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectToDB();
  return Response.json({ hi: "GET" });
}

export async function POST(request) {
  await connectToDB();
  try {
    const res = await request.json();
    console.log(res);
    let baru = new User(res);
    await baru.save();
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: error._message }, { status: 400 });
  }
}
