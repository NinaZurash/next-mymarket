import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import Wishlist from "@/components/wishlist/Wishlist";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productId, userId } = body;

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { wishlist: true }, // Include the wishlist array
  });
  if (!user) {
    return NextResponse.json({
      status: 404,
      message: "User not found",
    });
  }
  const productAlreadyAdded = user.wishlist.some((product) => product.id === productId);
  if (productAlreadyAdded) {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        wishlist: {
          // Add the new product to the existing wishlist
          disconnect: { id: productId },
        },
      },
      include: { wishlist: true }, // Include the updated wishlist
    });
    return NextResponse.json({
      status: 400,
      message: "Product already added to wishlist",
      wishlist: updatedUser.wishlist,
    });
  }
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        wishlist: {
          // Add the new product to the existing wishlist
          connect: { id: productId },
        },
      },
      include: { wishlist: true }, // Include the updated wishlist
    });

    return NextResponse.json({
      status: 200,
      message: "Product added to wishlist",
      wishlist: updatedUser.wishlist,
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
    include: { wishlist: true }, // Include the wishlist array
  });
  if (!user) {
    return NextResponse.json({
      status: 404,
      message: "User not found",
    });
  }

  return NextResponse.json({
    status: 200,
    data: user.wishlist,
  });
}
