import { db } from "@/lib/db";
import { sendVerificationCode } from "@/services/auth/user";
import { NextApiHandler, NextApiRequest } from "next";
import { NextResponse, NextRequest } from "next/server";

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
          resetPasswordToken: token,
          resetPasswordExpires: new Date(Date.now() + 60000),
        },
      });
      console.log(updateUser);
      return NextResponse.json({
        expires: existingUser.resetPasswordExpires,
      });
    } else
      return NextResponse.json(
        {
          user: null,
          message: "user not found",
        },
        { status: 404 }
      );
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const email = query.get("email");
  const token = query.get("token")
    ? parseInt(query.get("token") as string)
    : null;

  if (!email || !token) {
    return NextResponse.json({ isValid: false }, { status: 400 });
  }
  try {
    const user = await db.user.findUnique({
      where: { email: email },
    });
    if (user) {
      return NextResponse.json({
        isValid:
          user.resetPasswordToken === token &&
          user.resetPasswordExpires &&
          user.resetPasswordExpires > new Date(),
      });
    } else
      return NextResponse.json(
        {
          user: null,
          message: "user not found",
        },
        { status: 404 }
      );
  } catch (error) {
    return NextResponse.json(
      {
        user: null,
        message: "Something went wrong",
      },
      { status: 404 }
    );
  }
}
