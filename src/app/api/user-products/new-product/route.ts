import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, title, description, price, category, image } = body;

  try {
    const createProduct = await db.products.create({
      data: {
        title,
        description,
        price,
        category,
        image,
        author: {
          connect: { id: userId },
        },
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Product added successfully",
      product: createProduct,
    });
  } catch {
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const userId = query.get("userId");
  if (userId === null) {
    return NextResponse.json({
      status: 400,
      message: "User ID is required",
    });
  }
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { myproducts: true }, // Include the wishlist array
  });
  if (!user) {
    return NextResponse.json({
      status: 404,
      message: "User not found",
    });
  }

  return NextResponse.json({
    status: 200,
    data: user.myproducts,
  });
}
