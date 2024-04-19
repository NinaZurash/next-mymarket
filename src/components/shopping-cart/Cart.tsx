"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";

import { useUserCart } from "@/providers/CartProvider";

import CartProductCard from "../products/CartProductCard";
import { Button } from "../ui/button";
import UserMenu from "../user/userMenu";
import EmptyCart from "./EmptyCart";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Cart() {
  const { cart } = useUserCart();
  const { data: session } = useSession();

  const sum = cart
    .map((product) => product.price)
    .reduce((acc, price) => acc + parseFloat(price), 0);

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
            <div className="mt-5 flex flex-col gap-4">
              {cart.map((product) => {
                return <CartProductCard key={product.id} product={product} />;
              })}
            </div>
          )}
          <hr className="mt-3 h-[0.2px] border-none bg-slate-300" />
          <div className="flex w-full justify-end ">
            <div className="flex flex-col gap-4">
              <div className="text-center text-lg font-bold">ჯამი: {sum} ლ</div>
              <Button className="w-36">ყიდვა</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
