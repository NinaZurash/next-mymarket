"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";

import { useUserCart } from "@/providers/CartProvider";
import { useUserWishlist } from "@/providers/WishlistProvider";

import ProductCard from "../products/ProductCard";
import UserMenu from "../user/userMenu";
import EmptyCart from "./EmptyCart";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Cart() {
  const { cart } = useUserCart();
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-10">
      <div className="flex w-full gap-4 bg-[#f0f3f6] px-20 py-12">
        {session?.user ? <UserMenu /> : <div className="min-h-[30rem]"></div>}
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center">
            <Link href={`${BASE_URL}/`}>
              <span className="text-[13px] font-semibold text-gray-400">მთავარი </span>
            </Link>
            <ChevronRight size={14} className=" text-zinc-500" />
            <span className="text-[13px] font-semibold">ჩემი კალათა </span>
          </div>
          <div className="text-2xl font-black">ჩემი კალათა</div>
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex gap-4">
              {cart.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
