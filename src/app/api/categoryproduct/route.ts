import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const category = query.get("category");
    console.log(category);
    if (!category){
      return NextResponse.json({ products:null,message:"invalid category" }, { status: 400 });
    }
    try {
      const products = await db.products.findMany({
        where: { category: category },
      });
      if (products) {
        return NextResponse.json({
          products: products,
          message: "products found",
        },{status:200});
      } else
        return NextResponse.json(
          {
            user: null,
            message: "products not found",
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