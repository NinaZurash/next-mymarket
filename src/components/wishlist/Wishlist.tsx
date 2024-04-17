import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";

import ProductCard from "../products/ProductCard";
import UserMenu from "../user/userMenu";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Wishlist() {
  return (
    <div className="mt-[100px] flex min-h-screen flex-col items-center justify-between gap-10">
      <div className="flex w-full  gap-4 bg-[#f0f3f6] px-20 py-12">
        <UserMenu />
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center">
            <Link href={`${BASE_URL}/`}>
              <span className="text-[13px] font-semibold text-gray-400">მთავარი </span>
            </Link>
            <ChevronRight size={14} className=" text-zinc-500" />
            <span className="text-[13px] font-semibold">ჩემი რჩეულები </span>
          </div>
          <div className="text-2xl font-black">ჩემი რჩეულები</div>
          <div className="relative mx-auto mt-56 flex w-auto flex-col items-center gap-3">
            <Heart className="size-10 rounded-full bg-[#e8ebf0] p-3 text-[#8896ae]" />
            <div className="text-lg font-semibold">შენ არ გაქვს ფავორიტების სია</div>
            <div className="text-[15px] text-slate-400">
              ფავორიტებში დასამატებლად დააჭირეთ გულის ხატულას პროდუქტის ფოტოს მარჯვენა კუთხეში
            </div>
            <Link
              href={`${BASE_URL}/`}
              className="mt-5 rounded-2xl bg-[#fec900] px-14 py-5 text-[15px] font-black text-white"
            >
              სიის შექმნა
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
