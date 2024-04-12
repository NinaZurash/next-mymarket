"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import CategoriesList from "./CategoriesList";
export type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};
export default function HomeProducts() {
  return (
    <div className="flex flex-col justify-center gap-9 p-6 w-full">
      <h1 className="text-[1.5rem] pt-8 font-semibold">
        ყველაფერი, რასაც ეძებ
      </h1>
      <div className="flex items-center gap-8">
        <Input
          className="p-8 border-amber-300 border-2 flex-1 rounded-2xl"
          placeholder="მაგ. Iphone 14"
          type="search"
        />
        <Button className="text-md py-9 px-14 rounded-2xl hover:bg-[rgb(251,223,64)] bg-[#fec900] text-slate-900 font-semibold flex gap-4">
          <Search size={20} /> ძებნა
        </Button>
      </div>

      <div className="flex gap-4 flex-col pt-6">
        <span className="flex text-[15px] font-black">
          ძებნა კატეგორიის მიხედვით
        </span>
        <CategoriesList />
      </div>
      <div className="flex flex-wrap gap-10 justify-between">
        
      </div>
    </div>
  );
}
