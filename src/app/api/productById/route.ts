import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const id = query.get("id");

    if (!id){
      return NextResponse.json({ products:null,message:"invalid product" }, { status: 400 });
    }
    try {
      const product = await db.products.findUnique({
        where: { id: id },
      });
      if (product) {
        return NextResponse.json({
          product: product,
          message: "product found",
        },{status:200});
      } else
        return NextResponse.json(
          {
            user: null,
            message: "product not found",
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