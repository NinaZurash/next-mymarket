import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const products = await db.products.findMany();
    if (!products) {
      return NextResponse.json(
        {
          products: null,
          message: "No products found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        products: products,
        message: "products found",
      },
      { status: 200 },
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
