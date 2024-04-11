import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z
  .object({
    firstName: z.string().min(1, "Firstname is required").max(100),
    lastName: z.string().min(1, "Lastname is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    username: z.string().min(1, "Username is required").max(100),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, username, lastName, password } =
      userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    console.log(existingUserByEmail);
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "User with this username already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json({
      user: rest,
      message: "User created successfully",
      status: 201,
    });
  } catch {
    return NextResponse.json(
      { user: null, message: "Error creating user" },
      { status: 500 }
    );
  }
}
