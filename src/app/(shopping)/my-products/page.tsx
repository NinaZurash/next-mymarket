"use client";

import { useGetMyProducts } from "@/services/newProduct";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { ProductType } from "@/types/globalTypes";
import { useUserProducts } from "@/providers/UserProductsProvider";
import EmptyProducts from "@/components/new-product/EmptyProducts";
import ProductCard from "@/components/products/ProductCard";
import { useToast } from "@/components/ui/use-toast";
import UserMenu from "@/components/user/userMenu";
import EmptyWishlist from "@/components/wishlist/EmptyWishlist";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function MyProducts() {
  const { data: session } = useSession();
  const { userProducts } = useUserProducts();
  const { toast } = useToast();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-10">
      <div className="flex w-full gap-4 bg-[#f0f3f6] px-20 py-12">
        {session?.user ? <UserMenu /> : <div className="min-h-[30rem]"></div>}
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center">
            <Link href={`${baseURL}/`}>
              <span className="text-[13px] font-semibold text-gray-400">მთავარი </span>
            </Link>
            <ChevronRight size={14} className=" text-zinc-500" />
            <span className="text-[13px] font-semibold">ჩემი განცხადებები </span>
          </div>
          <div className="text-2xl font-black">ჩემი განცხადებები</div>
          {userProducts.length === 0 ? (
            <EmptyProducts />
          ) : (
            <div className="flex gap-4">
              {userProducts.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
