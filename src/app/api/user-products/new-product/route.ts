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
