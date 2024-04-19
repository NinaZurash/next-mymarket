"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import UserMenu from "../user/userMenu";
import ProductDetails from "./ProductDetails";
import ProductParameters from "./ProductParameters";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function NewProduct() {
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
            <span className="text-[13px] font-semibold">განცხადების დამატება </span>
          </div>
          <div className="text-2xl font-black">განცხადების დამატება</div>
          <ProductDetails />
          <ProductParameters />
        </div>
      </div>
    </div>
  );
}
