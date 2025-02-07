import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log(`Email: ${email} and Password: ${password}`);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    console.log("Connected");

    const existingUser = await User.find({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }
    console.log("existing user: ", existingUser);

    const user = await User.create({
      email,
      password,
    });

    console.log("User: ",user);

    return NextResponse.json(
      { message: "User registerd successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to register User registered successfully" },
      { status: 500 }
    );
  }
}
