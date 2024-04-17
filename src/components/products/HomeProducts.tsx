"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Search } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CategoriesList from "./CategoriesList";
import VipProducts from "./VipProducts";

export type Product = {
  id: string;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};
export default function HomeProducts() {
  return (
    <div className="flex w-full flex-col justify-center gap-9 p-6">
      <h1 className="pt-8 text-[1.5rem] font-semibold">ყველაფერი, რასაც ეძებ</h1>
      <div className="flex items-center gap-8">
        <Input
          className="flex-1 rounded-2xl border-2 border-amber-300 p-8"
          placeholder="მაგ. Iphone 14"
          type="search"
        />
        <Button className="text-md flex gap-4 rounded-2xl bg-[#fec900] px-14 py-9 font-semibold text-slate-900 hover:bg-[rgb(251,223,64)]">
          <Search size={20} /> ძებნა
        </Button>
      </div>

      <div className="flex flex-col gap-4 pt-6">
        <span className="flex text-[15px] font-black">ძებნა კატეგორიის მიხედვით</span>
        <CategoriesList />
      </div>
      <div>
        <VipProducts />
      </div>
      <div className="flex flex-wrap justify-between gap-10"></div>
    </div>
  );
}
