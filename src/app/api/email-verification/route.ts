import { sendVerificationCode } from "@/services/auth/user";

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;
  try {
    const existingUser = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      const token = Math.floor(1000 + Math.random() * 9000);
      sendVerificationCode({ email, token });

      const updateUser = await db.user.update({
        where: { email: email },
        data: {
          emailVerificationCode: token,
        },
      });
      return NextResponse.json(
        {
          message: "verification code sent to your email",
        },
        { status: 200 },
      );
    } else
      return NextResponse.json(
        {
          user: null,
          message: "user not found",
        },
        { status: 404 },
      );
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const email = query.get("email");
  const token = query.get("token") ? parseInt(query.get("token") as string) : null;

  if (!email || !token) {
    return NextResponse.json({ isValid: false }, { status: 400 });
  }
  try {
    const user = await db.user.findUnique({
      where: { email: email },
    });
    if (user) {
      const isValid = user.emailVerificationCode === token;
      if (isValid) {
        await db.user.update({
          where: { email: email },
          data: {
            emailVerified: new Date(),
            emailVerificationCode: null,
          },
        });
        return NextResponse.json({
          isValid: user.emailVerificationCode === token,
        });
      } else
        return NextResponse.json(
          {
            isValid: false,
          },
          { status: 404 },
        );
    } else
      return NextResponse.json(
        {
          user: null,
          message: "user not found",
        },
        { status: 404 },
      );
  } catch (error) {
    return NextResponse.json(
      {
        user: null,
        message: "Something went wrong",
      },
      { status: 404 },
    );
  }
}
