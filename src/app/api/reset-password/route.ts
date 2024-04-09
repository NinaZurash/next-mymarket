import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password, email } = body;
  try {
    const updateUser = await db.user.update({
      where: { email: email },
      data: {
        password: password,
      },
    });
    if (!updateUser) {
      return NextResponse.json({
        status: 404,
        json: { message: "User not found" },
      });
    }
    return NextResponse.json({
      status: 200,
      json: { message: "Password updated" },
    });
  } catch {
    return NextResponse.json({
      status: 500,
      json: { message: "Server error" },
    });
  }
}
