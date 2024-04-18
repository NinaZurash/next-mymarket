import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productId, userId } = body;

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { cart: true }, // Include the cart array
  });
  if (!user) {
    return NextResponse.json({
      status: 404,
      message: "User not found",
    });
  }
  const productAlreadyAdded = user.cart.some((product) => product.id === productId);
  if (productAlreadyAdded) {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        cart: {
          // Add the new product to the existing cart
          disconnect: { id: productId },
        },
      },
      include: { cart: true }, // Include the updated cart
    });
    return NextResponse.json({
      status: 400,
      message: "Product already added to Cart",
      cart: updatedUser.cart,
    });
  }
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        cart: {
          // Add the new product to the existing cart
          connect: { id: productId },
        },
      },
      include: { cart: true }, // Include the updated cart
    });

    return NextResponse.json({
      status: 200,
      message: "Product added to cart",
      cart: updatedUser.cart,
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
    include: { cart: true }, // Include the cart array
  });
  if (!user) {
    return NextResponse.json({
      status: 404,
      message: "User not found",
    });
  }

  return NextResponse.json({
    status: 200,
    data: user.cart,
  });
}
